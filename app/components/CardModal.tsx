"use client";

import { Box, Button, Grid2, IconButton, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";

interface CardModalProps {
    cardModalOpen: {
      listName: string;
      cardName: string;
      newDesc: string;
      isEditDesc: boolean;
      listId: number;
      cardId: number;
    };
    setCardModalOpen: Dispatch<SetStateAction<CardModalProps["cardModalOpen"]>>;
    onSaveModalDesc: () => void;
    listData: any[]; 
    setListData: Dispatch<SetStateAction<any[]>>; 
    onRemoveElement: (listId: number, cardId: number) => void;
  }

  export default function CardModal({
    cardModalOpen,
    setCardModalOpen,
    onSaveModalDesc,
    listData,
    setListData,
    onRemoveElement,
  }: CardModalProps) {
  return (
    <Modal
        open={!!cardModalOpen.listId}
        onClose={() =>
          setCardModalOpen({
            ...cardModalOpen,
            listId: 0,
            cardId: 0,
          })
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 250,
            bgcolor: "#ffffff",
            borderRadius: "2px",
            boxShadow: 24,
            p: 4,
            color: "black",
          }}
        >
          <div>
            <Typography id="modal-modal-title" variant="h6">
              {cardModalOpen.cardName}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ fontSize: 14, color: "#313131" }}
            >
              Dans la liste <u>{cardModalOpen.listName}</u>
            </Typography>
          </div>
          <Grid2
            container
            spacing={3}
            direction="row"
            sx={{ marginTop: "10px" }}
          >
            <Grid2
              container
              spacing={1}
              direction="column"
              sx={{ width: "70%" }}
            >
              <Typography variant="h6">Description</Typography>
              {cardModalOpen.isEditDesc ? (
                <Grid2>
                  <TextField
                    sx={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      marginBottom: "5px",
                    }}
                    variant="outlined"
                    value={cardModalOpen.newDesc || ""}
                    onChange={(e) =>
                      setCardModalOpen({
                        ...cardModalOpen,
                        newDesc: e.target.value,
                      })
                    }
                  ></TextField>
                  <Grid2>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => onSaveModalDesc()}
                    >
                      Enregistrer
                    </Button>
                    <IconButton>
                      <CloseIcon
                        onClick={() =>
                          setCardModalOpen({
                            ...cardModalOpen,
                            isEditDesc: false,
                          })
                        }
                      />
                    </IconButton>
                  </Grid2>
                </Grid2>
              ) : (
                <TextField
                  sx={{
                    width: "100%",
                    backgroundColor: "#091e420a",
                    marginBottom: "5px",
                  }}
                  variant="outlined"
                  value={cardModalOpen.newDesc || ""}
                  onClick={() =>
                    setCardModalOpen({
                      ...cardModalOpen,
                      isEditDesc: true,
                    })
                  }
                ></TextField>
              )}
            </Grid2>
            <Grid2
              container
              spacing={1}
              direction="column"
              sx={{ width: "25%" }}
            >
              <Typography variant="h6">Actions</Typography>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#091e420a",
                  color: "#313131",
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}
                onClick={() =>
                  setListData((prevListData) =>
                    prevListData.map((list) => {
                      if (list.id === cardModalOpen.listId) {
                        return {
                          ...list,
                          cards: list.cards.map((card: { id: number; isFollowed: any; }) => {
                            if (card.id === cardModalOpen.cardId) {
                              return {
                                ...card,
                                isFollowed: !card.isFollowed,
                              };
                            }
                            return card;
                          }),
                        };
                      }
                      return list;
                    })
                  )
                }
                startIcon={<VisibilityIcon />}
              >
                Suivre
                {listData
                  .find((list) => list.id === cardModalOpen.listId)
                  ?.cards.find((card: { id: number; }) => card.id === cardModalOpen.cardId)
                  ?.isFollowed ? (
                  <span
                    style={{
                      WebkitBoxPack: "center",
                      WebkitBoxAlign: "center",
                      backgroundColor: "rgb(97, 189, 79)",
                      height: "24px",
                      width: "24px",
                      borderRadius: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "auto",
                    }}
                  >
                    <CheckIcon style={{ color: "white", fontSize: 17 }} />
                  </span>
                ) : null}
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#091e420a",
                  color: "#313131",
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}
                onClick={() =>
                  onRemoveElement(cardModalOpen.listId, cardModalOpen.cardId)
                }
                startIcon={<CloseIcon />}
              >
                Supprimer
              </Button>
            </Grid2>
          </Grid2>
          <CloseIcon
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={() =>
              setCardModalOpen({
                ...cardModalOpen,
                listId: 0,
                cardId: 0,
              })
            }
          />
        </Box>
      </Modal>
  );
}
