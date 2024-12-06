.PHONY: deploy
deploy:
	ansible-playbook -i deployment/inventory.ini deployment/playbook.deploy.yml


resize:
	magick ./static/splash.png -resize 1290x2796! ./static/apple-splash-1290x2796.png
	magick ./static/splash.png -resize 1284x2778! ./static/apple-splash-1284x2778.png
	magick ./static/splash.png -resize 1179x2556! ./static/apple-splash-1179x2556.png
	magick ./static/splash.png -resize 1170x2532! ./static/apple-splash-1170x2532.png
	magick ./static/splash.png -resize 1125x2436! ./static/apple-splash-1125x2436.png
	magick ./static/splash.png -resize 1242x2688! ./static/apple-splash-1242x2688.png
	magick ./static/splash.png -resize 828x1792! ./static/apple-splash-828x1792.png
	magick ./static/splash.png -resize 1242x2208! ./static/apple-splash-1242x2208.png
	magick ./static/splash.png -resize 750x1334! ./static/apple-splash-750x1334.png
	magick ./static/splash.png -resize 640x1136! ./static/apple-splash-640x1136.png
