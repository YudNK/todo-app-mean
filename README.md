# TODO app with MEAN stack

Create a TODO app with MEAN stack for my learning.

## Development, middleware, Runtime

### Frontend
nginx, angular  

### Backend
node, typescript, express  

### Database
mongodb

### Others
Git, Github, Docker, k8s

## Deploy 

### Build
### Test
### Run
#### 1. Docker Runtime 
Create db container and run command. (at /backend/db)  
```bash
docker run --env-file ./.env_db -v ./data:/data/db -d --network=<bridge> --name todo-db-container <image>
```

Create backend container and run command.  
```bash
docker run --env-file ./.env_be -p 127.0.0.1:3000:3000 -d --network=<bridge> --name todo-backend-container <image>
```

Create frontend container and run command.  
```bash
docker run -p 127.0.0.1:8080:80 -d --network=<bridge> --name todo-frontend-container <image>
```

#### 2. Kubernetes 
(WIP)k8s minikube
