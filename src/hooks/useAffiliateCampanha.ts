import { useState, useEffect } from 'react';

// TODO: Pegar do banco de dados usando o usuario logado e seu slug de afiliado
const useAffiliate = () => {
  const [affiliate, setAffiliate] = useState<string | null>(null);

  useEffect(() => {
    const mockAffiliate = 'DKC';
    setAffiliate(mockAffiliate);
  }, []);

  return affiliate;
};

export default useAffiliate;