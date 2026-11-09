FROM maven:3.9.6-eclipse-temurin-17-alpine

WORKDIR /app

# Copiar el pom.xml e instalar dependencias para aprovechar la caché de Docker
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src

EXPOSE 8080

CMD ["mvn", "spring-boot:run"]