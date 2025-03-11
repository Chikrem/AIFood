import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    //OBETER RESTAURANTES API DE ADMINISTRAÇÃO
    axios
      .get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data))

      .catch((erro) => console.log(erro));
  }, []);

  function excluir(restaurante: IRestaurante): void {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${restaurante.id}/`)
      .then(() => {
        setRestaurantes((prevRestaurantes) =>
          prevRestaurantes.filter((resposta) => resposta.id !== restaurante.id)
        );
      })
      .catch((erro) => console.log(erro));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Restaurantes</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow
              key={restaurante.nome}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {restaurante.nome}
              </TableCell>
              <TableCell>
                  [ <Link to={`/admin/restaurantes/${restaurante.id}`}> Editar </Link> ]
              </TableCell>
              <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                    Excluir
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
