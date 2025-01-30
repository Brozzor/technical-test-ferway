"use client";
import Image from "next/image";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Toolbar,
  Typography,
  TextareaAutosize,
  IconButton,
  Input,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NotesIcon from "@mui/icons-material/Notes";
import { useState } from "react";
import defaultDatas from "../data/defaultDatas.json";

export default function Home() {
  const [newCardInputValues, setNewCardInputValues] = useState("");
  const [addCardId, setAddCardId] = useState<number | null>(null);
  const [listData, setListData] = useState(defaultDatas);

  const [isActiveAddList, setIsActiveAddList] = useState(false);
  const [newListInputValue, setNewListInputValue] = useState("");

  const [cardModalOpen, setCardModalOpen] = useState<number | null>(null);

  const onAddCard = (listId: number) => {
    if (!newCardInputValues.trim()) return;
    setListData((prevListData) =>
      prevListData.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [
              ...list.cards,
              {
                id: new Date().getTime(),
                cardName: newCardInputValues,
                cardDesc: "",
                isFollowed: false,
              },
            ],
          };
        }
        return list;
      })
    );
    setNewCardInputValues("");
    setAddCardId(0);
  };

  const onAddList = () => {
    if (!newListInputValue.trim()) return;
    setListData((prevListData) => [
      ...prevListData,
      {
        id: new Date().getTime(),
        listName: newListInputValue,
        cards: [],
      },
    ]);
    setNewListInputValue("");
    setIsActiveAddList(false);
  };

  const onRemoveList = (listId: number) => {
    const isConfirmed = window.confirm(
      "Vous allez supprimer la liste nommer " +
        listData.find((list) => list.id === listId)?.listName +
        ".\nAppuyez sur 'OK' pour continuer.\nOu sur 'Annuler' pour fermer."
    );
    if (isConfirmed) {
      setListData((prevListData) =>
        prevListData.filter((list) => list.id !== listId)
      );
    }
  };

  return (
    <div>
      <header>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense" sx={{ mx: "auto" }}>
            <Image
              src="/images/logo.png"
              alt="Next Trello"
              width={80}
              height={30}
            />
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <Grid2
          alignItems="center"
          container
          spacing={2}
          sx={{ margin: "10px" }}
        >
          <Typography variant="h1">Tableau principal</Typography>
          <Button variant="contained" color="success">
            Initialiser le jeu de données
          </Button>
        </Grid2>

        <Grid2 container spacing={1} sx={{ margin: "10px" }}>
          {listData.map((list) => (
            <Grid2 key={list.id}>
              <Card sx={{ width: 300, backgroundColor: "#ebecf0" }}>
                <CardContent sx={{ padding: "10px" }}>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {list.listName}
                    <IconButton>
                      <MoreHorizIcon onClick={() => onRemoveList(list.id)} />
                    </IconButton>
                  </Typography>
                  <Grid2 container spacing={1} direction="column">
                    {list.cards.map((card) => (
                      <Card sx={{ backgroundColor: "#ffffff" }} key={card.id}>
                        <CardContent
                          sx={{
                            padding: "10px",
                            paddingBottom: "10px !important",
                          }}
                        >
                          <Typography>{card.cardName}</Typography>
                          <Grid2 container spacing={1} direction="row">
                            {card.isFollowed ? (
                              <VisibilityIcon fontSize="inherit"></VisibilityIcon>
                            ) : null}
                            {card.cardDesc ? (
                              <NotesIcon fontSize="inherit"></NotesIcon>
                            ) : null}
                          </Grid2>
                        </CardContent>
                      </Card>
                    ))}
                  </Grid2>
                </CardContent>
                <CardActions>
                  {addCardId != list.id ? (
                    <Button
                      size="small"
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        justifyContent: "flex-start",
                      }}
                      startIcon={<AddIcon />}
                      onClick={() => setAddCardId(list.id)}
                    >
                      Ajouter une autre carte
                    </Button>
                  ) : (
                    <Grid2>
                      <TextField
                        multiline
                        minRows={4}
                        sx={{
                          width: "100%",
                          backgroundColor: "#ffffff",
                          marginBottom: "5px",
                        }}
                        variant="outlined"
                        value={newCardInputValues || ""}
                        onChange={(e) => setNewCardInputValues(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => onAddCard(list.id)}
                      >
                        Ajouter une carte
                      </Button>
                      <IconButton>
                        <CloseIcon onClick={() => setAddCardId(0)} />
                      </IconButton>
                    </Grid2>
                  )}
                </CardActions>
              </Card>
            </Grid2>
          ))}
          <Grid2>
            <Card sx={{ width: 300, backgroundColor: "#ffffff3d" }}>
              <CardActions>
                {!isActiveAddList ? (
                  <Button
                    size="small"
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      justifyContent: "flex-start",
                      color: "#fff",
                    }}
                    startIcon={<AddIcon />}
                    onClick={() => setIsActiveAddList(true)}
                  >
                    Ajouter une autre liste
                  </Button>
                ) : (
                  <Grid2>
                    <TextField
                      sx={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        marginBottom: "5px",
                        borderRadius: "5px",
                      }}
                      placeholder="Saissisez le titre de la liste"
                      variant="outlined"
                      value={newListInputValue || ""}
                      onChange={(e) => setNewListInputValue(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => onAddList()}
                    >
                      Ajouter une liste
                    </Button>
                    <IconButton>
                      <CloseIcon onClick={() => setIsActiveAddList(false)} />
                    </IconButton>
                  </Grid2>
                )}
              </CardActions>
            </Card>
          </Grid2>
        </Grid2>
      </main>
    </div>
  );
}
