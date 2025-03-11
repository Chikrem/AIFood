import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      axios
        .get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then((resposta) => {
          setNomeRestaurante(resposta.data.nome);
        });
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState<string>("");

  const aoSubmeter = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      // Atualiza restaurante existente
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso");
        });
    } else {
      // Cria novo restaurante
      axios
        .post("http://localhost:8000/api/v2/restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso");
        });
    }
  };

  return (
    <Box sx={{ display: "flex", marginTop: 5, flexDirection: "column", gap: 2, alignItems: "center" }}>
      <Box component="form" onSubmit={aoSubmeter}>
        <Typography component="h1" variant="h4">
          Formulário de Restaurantes
        </Typography>
        <TextField
          value={nomeRestaurante}
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
          required
          id="standard-input"
          label="Nome"
          type="standard"
          variant="standard"
          fullWidth
        />
        <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
