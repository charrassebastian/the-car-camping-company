cd cliente/guarderia
npm install
ng build
cd ../..
rm -r guarderia/src/main/resources/static/*
cp -r cliente/guarderia/dist/guarderia/* guarderia/src/main/resources/static/
cd guarderia
./mvnw clean package
cp target/guarderia-1.0.war ../dist
cd ..
