###
 # @Author: Fullsize
 # @Date: 2023-09-17 10:57:48
 # @LastEditors: Fullsize
 # @LastEditTime: 2023-09-17 11:45:02
 # @FilePath: /react-falsework/clear.sh
### 
docker stop nginx8080
docker image prune
docker container prune
docker build . -t app1
docker run -it -d -p 8080:80 --name nginx8080  app1 
docker exec -it nginx8080 /bin/bash