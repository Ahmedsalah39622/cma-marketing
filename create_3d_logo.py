import cv2
import numpy as np
from PIL import Image

def create_3d_effect(input_path, output_path, depth=20):
    # Read the image
    img = Image.open(input_path)
    img = img.convert('RGBA')
    
    # Get the alpha channel
    r, g, b, a = img.split()
    
    # Create output image with extended width
    width, height = img.size
    new_width = width + depth
    new_img = Image.new('RGBA', (new_width, height), (0, 0, 0, 0))
    
    # Create layers
    for i in range(depth):
        offset = depth - i - 1
        # Create a new layer
        layer = Image.new('RGBA', (new_width, height), (0, 0, 0, 0))
        # Paste the original image with offset
        layer.paste(img, (offset, 0))
        # Adjust opacity for depth effect
        opacity = int(255 * (i / depth))
        mask = Image.new('L', layer.size, opacity)
        layer.putalpha(mask)
        # Composite the layer
        new_img = Image.alpha_composite(new_img, layer)
    
    # Save the result
    new_img.save(output_path, 'PNG')

# Create 3D version of the logo
create_3d_effect('D:/novix-web/image.png', 'D:/novix-web/image_3d.png')