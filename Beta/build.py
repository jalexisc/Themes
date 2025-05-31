# build.py: Script para compilar el dashboard Beta usando solo la biblioteca estándar de Python
import os
import shutil
import json
import re
from pathlib import Path
from string import Template

def load_config():
    with open('src/data/config.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def process_template(template_path, context):
    content = read_file(template_path)
    return Template(content).safe_substitute(context)

def process_includes(content):
    include_pattern = re.compile(r'{% include "([^"]+)"(?: with ([^%]+))? %}')
    def include_repl(match):
        path = match.group(1)
        vars_str = match.group(2)
        vars_dict = {}
        if vars_str:
            for pair in vars_str.strip().split():
                if '=' in pair:
                    k, v = pair.split('=', 1)
                    vars_dict[k] = v.strip('"')
        include_content = read_file(f'src/templates/{path}')
        # Sustituye variables simples en el include
        for k, v in vars_dict.items():
            include_content = include_content.replace(f'${{{k}}}', v)
        return include_content
    # Procesa recursivamente los includes
    while include_pattern.search(content):
        content = include_pattern.sub(include_repl, content)
    return content

def extract_blocks(content):
    """
    Extrae todos los bloques {% block nombre %} ... {% endblock %} en un dict.
    """
    blocks = {}
    for match in re.finditer(r'{% block ([^ ]+) %}(.*?){% endblock %}', content, re.DOTALL):
        blocks[match.group(1).strip()] = match.group(2).strip()
    return blocks

def build_page(page, config):
    # Cargar contenido de página
    page_content = read_file(f'src/templates/pages/{page}.html')
    page_content = process_includes(page_content)
    blocks = extract_blocks(page_content)
    # Cargar base
    base_tpl = read_file('src/templates/layouts/base.html')
    # Procesar includes en la base
    base_tpl = process_includes(base_tpl)
    # Renderizar sustituyendo los bloques
    context = {
        'title': blocks.get('title', config['name'] if page == 'dashboard' else 'Beta Dashboard'),
        'navbar': blocks.get('navbar', ''),
        'sidebar': blocks.get('sidebar', ''),
        'right_sidebar': blocks.get('right_sidebar', ''),
        'breadcrumb': blocks.get('breadcrumb', ''),
        'content': blocks.get('content', '')
    }
    html = Template(base_tpl).safe_substitute(context)
    write_file(f'dist/{page}.html', html)

def copy_assets():
    if os.path.exists('dist/assets'):
        shutil.rmtree('dist/assets')
    shutil.copytree('src/assets', 'dist/assets')

def clean_dist():
    # Elimina todos los archivos del directorio dist si existe
    if os.path.exists('dist'):
        print('Eliminando archivos previos de dist/')
        shutil.rmtree('dist')
    # Crea el directorio dist vacío
    os.makedirs('dist', exist_ok=True)

def main():
    clean_dist()
    config = load_config()
    # Compilar index.html
    build_page('index', config)
    copy_assets()
    print('Build completo. Archivos generados en dist/')

if __name__ == '__main__':
    main()
