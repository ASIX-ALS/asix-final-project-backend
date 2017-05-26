IMAGE = asix-final-project-node-backend
DOCKER = docker-compose
MACHINE = node-server
BACKMACHINE = eu.gcr.io/noted-feat-168716/asixfinalprojectbackend-api-server


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

deploy-production:
	@echo "Deploying backend... (production)";
	@docker build -t $(BACKMACHINE):v2 --build-arg ENV=production .
	@gcloud docker -- push $(BACKMACHINE):v2;
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
