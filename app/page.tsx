"use client";
import Image from "next/image";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Toolbar,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NotesIcon from "@mui/icons-material/Notes";
import { useState } from "react";
import defaultDatas from "../data/defaultDatas.json";
import { useLocalStorage } from "./utils/useLocalStorage";
import CardModal from "./components/CardModal";

export default function Home() {
  const [newCardInputValues, setNewCardInputValues] = useState("");
  const [addCardId, setAddCardId] = useState<number | null>(null);
  const [listData, setListData] = useLocalStorage("trello_list", defaultDatas);

  const [isActiveAddList, setIsActiveAddList] = useState(false);
  const [newListInputValue, setNewListInputValue] = useState("");

  const [cardModalOpen, setCardModalOpen] = useState<{
    listName: string;
    cardName: string;
    newDesc: string;
    isEditDesc: boolean;
    listId: number;
    cardId: number;
  }>({
    listId: 0,
    cardId: 0,
    newDesc: "",
    listName: "",
    cardName: "",
    isEditDesc: false,
  });

  const onSaveModalDesc = () => {
    setListData((prevListData) =>
      prevListData.map((list) => {
        if (list.id === cardModalOpen.listId) {
          return {
            ...list,
            cards: list.cards.map((card) => {
              if (card.id === cardModalOpen.cardId) {
                return {
                  ...card,
                  cardDesc: cardModalOpen.newDesc,
                };
              }
              return card;
            }),
          };
        }
        return list;
      })
    );
    setCardModalOpen({
      ...cardModalOpen,
      isEditDesc: false,
    });
  };

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

  const onRemoveElement = (listId: number, cardId: number | null) => {
    const isConfirmed = window.confirm(
      "Vous allez supprimer la liste nommer " +
        listData.find((list) => list.id === listId)?.listName +
        ".\nAppuyez sur 'OK' pour continuer.\nOu sur 'Annuler' pour fermer."
    );
    if (!isConfirmed) return false;

    if (cardId) {
      setListData((prevListData) =>
        prevListData.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              cards: list.cards.filter((card) => card.id !== cardId),
            };
          }
          return list;
        })
      );
      return setCardModalOpen({
        ...cardModalOpen,
        listId: 0,
        cardId: 0,
      });
    }

    setListData((prevListData) =>
      prevListData.filter((list) => list.id !== listId)
    );
  };

  const onResetData = () => {
    setListData(defaultDatas);
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
          <Button
            variant="contained"
            color="success"
            onClick={() => onResetData()}
          >
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
                      <MoreHorizIcon
                        onClick={() => onRemoveElement(list.id, null)}
                      />
                    </IconButton>
                  </Typography>
                  <Grid2 container spacing={1} direction="column">
                    {list.cards.map((card) => (
                      <Card
                        sx={{ backgroundColor: "#ffffff", cursor: "pointer" }}
                        key={card.id}
                        onClick={() =>
                          setCardModalOpen({
                            ...cardModalOpen,
                            cardName: card.cardName,
                            listName: list.listName,
                            newDesc: card.cardDesc,
                            listId: list.id,
                            cardId: card.id,
                          })
                        }
                      >
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
      <CardModal
        cardModalOpen={cardModalOpen}
        setCardModalOpen={setCardModalOpen}
        onSaveModalDesc={onSaveModalDesc}
        listData={listData}
        setListData={setListData}
        onRemoveElement={onRemoveElement}
      />
    </div>
  );
}
