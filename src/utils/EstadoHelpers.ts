const stateNameToAbbreviation: Record<string, string> = {
    Acre: "AC",
    Alagoas: "AL",
    Amapá: "AP",
    Amazonas: "AM",
    Bahia: "BA",
    Ceará: "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    Goiás: "GO",
    Maranhão: "MA",
    "Mato Grosso": "MT",
    "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG",
    Pará: "PA",
    Paraíba: "PB",
    Paraná: "PR",
    Pernambuco: "PE",
    Piauí: "PI",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS",
    Rondônia: "RO",
    Roraima: "RR",
    "Santa Catarina": "SC",
    "São Paulo": "SP",
    Sergipe: "SE",
    Tocantins: "TO",
  };
  
   // Helper para obter a sigla de um estado
  export function getStateAbbreviation(stateName: string): string | null {
    return stateNameToAbbreviation[stateName] || null;
  }
  
  // Helper para obter o nome completo de um estado a partir da sigla
  export function getStateName(abbreviation: string): string | null {
    const entries = Object.entries(stateNameToAbbreviation);
    for (let [stateName, abbr] of entries) {
      if (abbr === abbreviation) {
        return stateName;
      }
    }
    return null;
  }
  
  