FROM eclipse-temurin:17-jdk-alpine
VOLUMe /tmp
ADD /dist/guarderia-1.0.war app.war
ADD application.properties .
EXPOSE 80
ENTRYPOINT ["java", "-jar", "app.war"]
