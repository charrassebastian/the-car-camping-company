cd cliente/guarderia
npm install
ng build --source-map --optimization=false
cd ../..
rm -r guarderia/src/main/resources/static/*
cp -r cliente/guarderia/dist/guarderia/* guarderia/src/main/resources/static/
cd guarderia
./mvnw package
cp target/guarderia-1.0.war ../dist
cd ..
