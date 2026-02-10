#!/usr/bin/env python3
"""Convert PPT/PPTX presentations into per-slide images using LibreOffice + PyMuPDF."""
from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Iterable, List, Optional

try:
    import fitz  # type: ignore
except ImportError:  # pragma: no cover
    sys.stderr.write(
        "PyMuPDF (import name 'fitz') is required. Install with `pip install pymupdf`.\n"
    )
    sys.exit(1)


PRESENTATION_EXTENSIONS = {".ppt", ".pptx"}
DEFAULT_DPI = 150
SUPPORTED_IMAGE_FORMATS = {"png", "jpeg", "jpg", "tiff"}


def find_soffice() -> Optional[Path]:
    """Locate the LibreOffice `soffice` executable."""
    candidates: List[Path] = []
    env_path = os.environ.get("SOFFICE_PATH")
    if env_path:
        candidates.append(Path(env_path))

    for name in ("soffice", "soffice.exe"):
        path = shutil.which(name)
        if path:
            candidates.append(Path(path))

    # Common macOS installation path when using the .app bundle.
    mac_default = Path("/Applications/LibreOffice.app/Contents/MacOS/soffice")
    if mac_default.exists():
        candidates.append(mac_default)

    # Common Windows installs (64-bit and 32-bit).
    win_defaults = [
        Path(r"C:\\Program Files\\LibreOffice\\program\\soffice.exe"),
        Path(r"C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe"),
    ]
    candidates.extend(path for path in win_defaults if path.exists())

    for candidate in candidates:
        if candidate.exists() and os.access(candidate, os.X_OK):
            return candidate

    return None


def run_soffice_convert(soffice_path: Path, source: Path, temp_dir: Path) -> Path:
    """Use LibreOffice to convert a presentation to PDF inside `temp_dir`."""
    cmd = [
        str(soffice_path),
        "--headless",
        "--convert-to",
        "pdf",
        "--outdir",
        str(temp_dir),
        str(source),
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except FileNotFoundError as exc:
        raise RuntimeError(
            "LibreOffice executable not found. Set SOFFICE_PATH or install LibreOffice."
        ) from exc
    except subprocess.CalledProcessError as exc:
        raise RuntimeError(
            "LibreOffice failed to convert presentation to PDF\n"
            f"Command: {' '.join(cmd)}\n"
            f"Stdout: {exc.stdout.decode('utf-8', 'ignore')}\n"
            f"Stderr: {exc.stderr.decode('utf-8', 'ignore')}"
        ) from exc

    pdf_candidates = list(temp_dir.glob("*.pdf"))
    if not pdf_candidates:
        raise RuntimeError("LibreOffice conversion completed but no PDF was produced.")
    if len(pdf_candidates) > 1:
        # Pick the PDF whose stem matches the presentation first.
        match = temp_dir / f"{source.stem}.pdf"
        if match in pdf_candidates:
            return match
        pdf_candidates.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    return pdf_candidates[0]


def export_pdf_to_images(
    pdf_path: Path,
    output_dir: Path,
    base_name: str,
    image_format: str,
    dpi: int,
) -> int:
    """Render each page of the PDF to an image file.

    Returns the number of pages exported.
    """
    scale = dpi / 72.0
    matrix = fitz.Matrix(scale, scale)
    doc = fitz.open(pdf_path)
    count = 0
    try:
        for index, page in enumerate(doc, start=1):
            pix = page.get_pixmap(matrix=matrix, alpha=False)
            filename = f"{base_name}_slide_{index:03d}.{image_format}"
            out_path = output_dir / filename
            pix.save(out_path)
            count += 1
    finally:
        doc.close()
    return count


def iter_presentations(path: Path) -> Iterable[Path]:
    if path.is_file():
        if path.suffix.lower() in PRESENTATION_EXTENSIONS:
            yield path
        return

    for ext in PRESENTATION_EXTENSIONS:
        yield from path.rglob(f"*{ext}")


def parse_args(argv: Optional[List[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Convert PPT/PPTX presentations into per-slide images using LibreOffice and PyMuPDF."
        )
    )
    parser.add_argument(
        "input",
        type=Path,
        help="Path to a PPT/PPTX file or a directory containing presentations.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("slides-export"),
        help="Directory to store exported images (default: slides-export).",
    )
    parser.add_argument(
        "--image-format",
        choices=sorted(SUPPORTED_IMAGE_FORMATS),
        default="png",
        help="Image format for exported slides (default: png).",
    )
    parser.add_argument(
        "--dpi",
        type=int,
        default=DEFAULT_DPI,
        help=f"Rendering DPI for slide images (default: {DEFAULT_DPI}).",
    )
    parser.add_argument(
        "--keep-pdf",
        action="store_true",
        help="Keep the intermediate PDF files next to the exported images.",
    )
    parser.add_argument(
        "--flatten",
        action="store_true",
        help="Store images directly in output-dir instead of per-presentation subfolders.",
    )
    parser.add_argument(
        "--soffice",
        type=Path,
        help="Explicit path to the LibreOffice soffice executable.",
    )
    return parser.parse_args(argv)


def main(argv: Optional[List[str]] = None) -> int:
    args = parse_args(argv)

    if not args.input.exists():
        sys.stderr.write(f"Input path not found: {args.input}\n")
        return 1

    soffice_path = args.soffice or find_soffice()
    if not soffice_path:
        sys.stderr.write(
            "Could not locate LibreOffice `soffice`. Install LibreOffice or set SOFFICE_PATH.\n"
        )
        return 1

    if not soffice_path.exists():
        sys.stderr.write(f"Provided soffice path does not exist: {soffice_path}\n")
        return 1

    args.output_dir.mkdir(parents=True, exist_ok=True)

    presentations = list(iter_presentations(args.input))
    if not presentations:
        sys.stderr.write("No PPT/PPTX presentations found to convert.\n")
        return 1

    total_slides = 0
    for presentation in presentations:
        print(f"Converting {presentation}...")
        target_dir = args.output_dir if args.flatten else args.output_dir / presentation.stem
        target_dir.mkdir(parents=True, exist_ok=True)

        with tempfile.TemporaryDirectory(prefix="ppt-img-") as tmp_dir_str:
            tmp_dir = Path(tmp_dir_str)
            pdf_path = run_soffice_convert(soffice_path, presentation, tmp_dir)

            if args.keep_pdf:
                pdf_target = target_dir / f"{presentation.stem}.pdf"
                shutil.copy2(pdf_path, pdf_target)

            slide_count = export_pdf_to_images(
                pdf_path=pdf_path,
                output_dir=target_dir,
                base_name=presentation.stem,
                image_format=args.image_format,
                dpi=args.dpi,
            )
            total_slides += slide_count
            print(f"  -> Exported {slide_count} slide(s) to {target_dir}")

    print(f"All done! Exported {total_slides} slides from {len(presentations)} presentation(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
