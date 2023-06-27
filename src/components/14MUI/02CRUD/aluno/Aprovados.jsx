import {
  IconButton,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Aprovados = () => {
  const [alunos, setAlunos] = useState([]);
  const [mudou, setMudou] = useState(false);
  const [media, setMedia] = useState(0);

  useEffect(() => {
    //Buscando a media no novo metodo implementado na API
    axios
      .get("http://localhost:3001/aluno/media")
      .then((response) => {
        setMedia(response.data);
      })
      .catch((error) => console.log(error));
    //Foi julgado que a logica de aprovados é uma função do back
    //por isso foi criando uma nova rota que retorna apenas os aprovado,
    //dessa forma o codigo fica mais modular e organizado
    axios
      .get("http://localhost:3001/aluno/aprovados")
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function deleteAluno(id) {
    if (window.confirm("Deseja Excluir? " + id)) {
      axios
        .delete(`http://localhost:3001/Aluno/delete/${id}`)
        .then((response) => {
          deleteTeste(id);
          setMudou(!mudou);
        })
        .catch((error) => console.log(error));
    }
  }

  function deleteTeste(id) {
    for (let i = 0; i < alunos.length; i++) {
      if (alunos[i]._id == id) {
        alunos.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Listar Alunos
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>NOME</StyledTableCell>
              <StyledTableCell>CURSO</StyledTableCell>
              <StyledTableCell>IRA</StyledTableCell>
              <StyledTableCell align="center">AÇÕES</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {alunos.map((aluno) => {
              return (
                <StyledTableRow key={aluno._id}>
                  <StyledTableCell>{aluno._id}</StyledTableCell>
                  <StyledTableCell>{aluno.nome}</StyledTableCell>
                  <StyledTableCell>{aluno.curso}</StyledTableCell>
                  {/* Aqui omitimos a verificação de ira abaixo da media, uma vez que a listagem so retorna alunos acima da media */}
                  <StyledTableCell>{aluno.ira}</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => deleteAluno(aluno._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        sx={{ ml: 2 }}
                        component={Link}
                        to={`/editarAluno/${aluno._id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
            <StyledTableRow>
              <StyledTableCell>--</StyledTableCell>
              <StyledTableCell>--</StyledTableCell>
              <StyledTableCell>--</StyledTableCell>
              <StyledTableCell>{media}</StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    disabled={true}
                    aria-label="delete"
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    disabled={true}
                    aria-label="edit"
                    color="primary"
                    sx={{ ml: 2 }}
                    component={Link}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Aprovados;
