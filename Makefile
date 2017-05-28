IMAGE = asix-final-project-node-backend
DOCKER = docker-compose
MACHINE = alsback
# BACKMACHINE = eu.gcr.io/noted-feat-168716/asixfinalprojectbackend-api-server
BACKMACHINE = 727924676995.dkr.ecr.eu-west-2.amazonaws.com


help:
	@echo ""
	@echo "usage:"
	@echo ""
	@echo "* make run:              runs the backend in development mode (deattached)"
	@echo "* make stop:             stops the docker machine"
	@echo "* make build:            builds the docker image"
	@echo ""

build:
	@echo "Building machine...please, wait...";
	@docker build -t $(IMAGE) .
	@echo "Done! ✅";

run:
	@echo "Servering backend...";
	@$(DOCKER) up -d;
	@echo "Done! ✅";

stop:
	@echo "Stopping backend! 🍺";
	@$(DOCKER) down;
	@echo "Done! ✅";

awslogin:
	@echo "Loggin in aws...";
	@`aws ecr get-login --region eu-west-2`;
	@echo "Done!";

deploy-production:
	@echo "Deploying frontend... (production)";
	@docker build -t $(MACHINE):latest .
	@docker tag $(MACHINE):latest $(BACKMACHINE)/$(MACHINE):latest;
	@docker push $(BACKMACHINE)/$(MACHINE):latest;
	@echo "Done!";

coffee:
	@echo "                  (   (   (   ("
	@echo "                   )   )   )   )"
	@echo "                 _(___(___(___(__"
	@echo "                |                |"
	@echo "                |                |____"
	@echo "                |                 __  |"
	@echo "                |                |  | |"
	@echo "                |                |  | |"
	@echo "                |                |__| |"
	@echo "                |                _____|"
	@echo "                 \______________/"
