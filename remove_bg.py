import os
from rembg import remove

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input_data = i.read()
            output_data = remove(input_data)
            o.write(output_data)
    print(f"Saved {output_path}")

os.chdir('/Users/commerciax-fs-1/Documents/3d')

process_image('public/images/headphone_features.png', 'public/images/headphone_features_transparent.png')
process_image('public/images/numbered_headphone.png', 'public/images/numbered_headphone_transparent.png')
process_image('public/images/headphone_diagram.png', 'public/images/headphone_diagram_transparent.png')

print("All done!")
