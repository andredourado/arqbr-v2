import numpy as np
import sys
import asyncio
import cv2

async def align_image(fileName, temp_folder):
	image = cv2.imread(temp_folder + '/' + fileName + '.png')
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	gray = cv2.bitwise_not(gray)

	thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU) [1]

	coords = np.column_stack(np.where(thresh > 0))
	angle = cv2.minAreaRect(coords)[-1]

	if angle > 45:
		angle = 90 - angle
	else:
		angle = -angle

	(h, w) = image.shape[:2]
	center = (w // 2, h // 2)
	M = cv2.getRotationMatrix2D(center, angle, 1.0)
	rotated = cv2.warpAffine(image, M, (w, h),
		flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

	cv2.imwrite(temp_folder + '/' + fileName + '.png', rotated)

temp_folder = "tmp/images"
fileName = sys.argv[1:][0]

asyncio.run(align_image(fileName, temp_folder))