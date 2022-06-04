build:
	docker build -t kdevstack_front .

run:
	docker run -v /home/kostayne/Documents/projects/k_dev_stack_frontend:/app -d -t -p 3000:3000 --name kdevstack_front_c kdevstack_front

stop:
	docker stop kdevstack_front_c

rm:
	docker rm kdevstack_front_c

rmi: 
	docker rmi kdevstack_front

build_prod:
	docker build -t kdevstack_front_prod -f Dockerfile.prod .

run_prod:
	docker run -d -t --network host --name kdevstack_front_prod_c kdevstack_front_prod

stop_prod:
	docker stop kdevstack_front_prod_c

rm_prod:
	docker rm kdevstack_front_prod_c

rmi_prod:
	docker rmi kdevstack_front_prod

log_prod:
	docker container logs kdevstack_front_prod_c