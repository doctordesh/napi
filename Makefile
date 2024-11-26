.PHONY: deploy
deploy:
	ansible-playbook -i deployment/inventory.ini deployment/playbook.deploy.yml
