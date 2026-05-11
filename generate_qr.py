import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.colormasks import RadialGradiantColorMask

qr = qrcode.QRCode(version=2, error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=20, border=2)
qr.add_data('https://tajik-tourism-web-site.vercel.app')
qr.make(fit=True)

img = qr.make_image(
    image_factory=StyledPilImage,
    color_mask=RadialGradiantColorMask(
        center_color=(46, 139, 87),
        edge_color=(0, 51, 102),
        back_color=(255, 255, 255)
    )
)
img.save('qr_code_site.png')
print("QR-код сохранен: qr_code_site.png")
