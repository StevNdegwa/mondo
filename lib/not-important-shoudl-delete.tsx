
    return new Promise<ReactNode>(async (resolve, reject) => {
        const { data, error, isFetching, ...args } = await loadCountryDetails({
          cancelRefetch: true,
        });
        
        console.log(data, error, selectedCountry, args);
        
        if (error) {
          reject(error);
        }
  
        if (data) {
          console.log(data);
          let {
            data: {
              capital,
              code,
              currencyCodes,
              flagImageUri,
              name,
              numRegions,
              wikiDataId,
            },
          } = data;
  
          //capital: "Addis Ababa"
          //code: "ET"
          //currencyCodes: ["ETB"]
          //flagImageUri: "http://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Ethiopia.svg"
          //name: "Ethiopia"
          //numRegions: 11
          //wikiDataId: "Q115" //https://www.wikidata.org/wiki/Q115
  
          resolve(
            <section style={{ width: "100%", minHeight: "50px", padding: "1rem" }}>
              <header></header>
              <main>
                <h3>{name},{code}</h3>
              </main>
              <footer></footer>
              <div>
                Country name: {name}, {code}
              </div>
              <div>Capital city: {capital}</div>
            </section>
          );
        }
      });