"""Génère deux pages HTML statiques. Python standard uniquement."""
from pathlib import Path
from html import escape
import re
from content import TEXT

ROOT = Path(__file__).resolve().parent
template = (ROOT / 'template.html').read_text()
template = template.replace('@@energy_scene@@', (ROOT / 'energy-scene.html').read_text())
keys = set(re.findall(r'@@(\w+)@@', template))
for lang, index in [('fr', 0), ('en', 1)]:
    values = {key: translations[index] for key, translations in TEXT.items()}
    values.update({
        'lang': lang,
        'base': '',
        'locale': 'fr_FR' if lang == 'fr' else 'en_GB',
        'home': './',
        'fr_link': './' if lang == 'fr' else '../',
        'en_link': 'en/' if lang == 'fr' else './',
        'current_fr': 'aria-current="page"' if lang == 'fr' else '',
        'current_en': 'aria-current="page"' if lang == 'en' else '',
        'homsphere_locale': lang,
        'app_locale': 'fr/' if lang == 'fr' else '',
        'timeglass_image': 'timeglass-list.png' if lang == 'fr' else 'timeglass-list-en.png',
        'ai_tag': 'IA' if lang == 'fr' else 'AI',
        'energy_art_asset': f'energy-art-{lang}.svg',
    })
    def gallery_entry(number):
        label = values['cover_caption'] if number == 1 else f"{values['page_word']} {number}"
        alt = values['cover_alt'] if number == 1 else values['page_generic_alt'].format(number=number)
        return (f'<a href="assets/notebook/page-{number:02}.jpg" data-gallery data-full="assets/notebook/page-{number:02}.jpg" data-caption="{escape(label, quote=True)}">'
                f'<img src="assets/notebook/thumb-{number:02}.jpg" width="380" height="540" alt="{escape(alt, quote=True)}" loading="lazy" decoding="async">'
                f'<span>{number:02} / {escape(label)}</span><span class="zoom-mark" aria-hidden="true">+</span></a>')
    values['gallery_first'] = '\n'.join(gallery_entry(n) for n in range(1, 13))
    values['gallery_rest'] = '\n'.join(gallery_entry(n) for n in range(13, 45))
    missing = keys - values.keys()
    if missing:
        raise ValueError(f'Missing {lang} copy: {missing}')
    html = re.sub(r'@@(\w+)@@', lambda match: values[match[1]], template)
    if lang == 'en':
        html = re.sub(r'((?:src|href|data-full)=")(assets/|styles\.css|app\.js)', r'\1../\2', html)
    dest = ROOT / 'dist' / ('' if lang == 'fr' else 'en') / 'index.html'
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html)
    scene = re.search(r'<svg class="energy-scene\b[^\"]*".*?</svg>', html, re.S)[0]
    scene = scene.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1)
    svg_style = '<style>svg{background:#1d4135}.scene-stars,.scene-moon,.storage-route,.storage-particles{display:none}.energy-scene text{fill:#f4f0e7;font-family:sans-serif;font-size:15px}.energy-scene .ems-word{font-family:Georgia,serif;font-size:34px}.energy-scene .ems-brand{font-size:8px;letter-spacing:1px}@media(prefers-reduced-motion:reduce){.solar-particles{display:none}}</style>'
    scene = scene.replace('<defs>', svg_style+'<defs>', 1)
    (ROOT / 'dist' / 'assets' / f'energy-art-{lang}.svg').write_text(scene)
    print(f'{lang}: {dest.relative_to(ROOT)} ({len(html):,} characters)')
(ROOT / 'dist' / '.nojekyll').touch()
