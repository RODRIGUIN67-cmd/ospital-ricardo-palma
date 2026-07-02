# Etapa 1: Construir el proyecto
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

# Etapa 2: Levantar el servidor Tomcat 10 (El mismo de NetBeans)
FROM tomcat:10.1-jdk17
# Borramos archivos basura por defecto
RUN rm -rf /usr/local/tomcat/webapps/*
# Copiamos nuestro proyecto y lo renombramos a ROOT.war para que sea la página principal
COPY --from=build /app/target/*.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8080
CMD ["catalina.sh", "run"]
