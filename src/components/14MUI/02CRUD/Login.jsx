import { Typography, Container, Box, TextField, Button, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useState } from "react"

const Signin = () => {
  //Novo componente de login criando
  const navigate = useNavigate()

  //Estados de email e senha
  const[password, setPassword] = useState("");
  const[email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault()

    var user = {email, password}
    //fazendo requisição a nova rota de autenticação que foi criada
    axios.post("http://localhost:3001/users/login", user)
    .then(
        (response)=>{
            alert(`Usuario autenticado \n retorno: ${JSON.stringify(response.data)}`)
            navigate("/listarAluno")
        }
    )
    .catch(error=>console.log(error))
}
    return (
        <Container maxWidth="xs">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx = {{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    mt:10
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id = "email"
                    label = "Endereço de e-mail"
                    name ="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => setEmail(event.target.value)}
                 />
                <TextField 
                    required
                    margin="normal"
                    fullWidth
                    name = "senha"
                    label = "Senha"
                    type = "password"
                    id = "senha"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx = {{mt:3,mb:2}}
                >
                    Sign In
                </Button>
            </Box>
        </Container>
    )

}

export default Signin