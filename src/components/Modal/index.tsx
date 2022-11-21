import {
  Button,
  CategoriesContainer,
  Container,
  Input,
  LabelContainer,
  ModalContent,
  MultilineInput,
} from "./style";
import CloseIcon from "../../assets/close.png";
import { useModal } from "../../hooks/useModal";
import { ThemeContext } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import ICategory from "../../interfaces/ICategory";
import { useAppDispatch } from "../../hooks/useRedux";
import IStatus from "../../interfaces/IStatus";
import { addCard, updateOneCard } from "../../store/slices/card.slice";
import { updateColumns } from "../../store/slices/column.slice";
import getBackgroundColor from "../../helpers/getBackGroundColor";
interface ModalProps {
  visible: boolean;
}
const Modal: React.FC<ModalProps> = ({ visible }) => {
  const { toggleVisibility, selectedCard } = useModal();
  const theme = useContext(ThemeContext);

  const [title, setTitle] = useState<string | undefined>(selectedCard?.title);
  const [description, setDescription] = useState<string | undefined>(
    selectedCard?.description
  );
  const [cardCategory, setCardCategory] = useState<ICategory>(
    selectedCard?.category || ICategory.FEATURE
  );

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTitle(selectedCard?.title);
    setDescription(selectedCard?.description);
    setCardCategory(selectedCard?.category || ICategory.FEATURE);
  }, [selectedCard, visible]);

  const handleCloseModal = () => {
    toggleVisibility(undefined);
    setTitle(undefined);
    setDescription(undefined);
    setCardCategory(ICategory.FEATURE);
    setErrorMessage(undefined);
  };

  const handleSave = () => {
    if (!title) {
      setErrorMessage("the title is required");
      return;
    }
    setErrorMessage(undefined);

    if (!selectedCard?.id) {
      const newCard = {
        id: uuidV4(),
        title,
        description,
        category: cardCategory,
        status: IStatus.BACKLOG,
        hidden: false,
      };
      dispatch(addCard(newCard));
      dispatch(updateColumns(newCard.id));
      toggleVisibility(undefined);
      return;
    }
    const updateCard = {
      ...selectedCard,
      title,
      description,
      category: cardCategory,
    };
    dispatch(updateOneCard(updateCard));
    toggleVisibility(undefined);
    return;
  };

  if(!visible) return null;

  return (
    <Container>
      <ModalContent>
        <img src={CloseIcon} alt="closeIcon" onClick={handleCloseModal}/>

        <h3>Title</h3>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minLength={1}
          maxLength={50}
          containsError={!!errorMessage}
        />

        <h3>Description</h3>
        <MultilineInput
          aria-multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={300}
        />

        <CategoriesContainer>
          {Object.values(ICategory).map((item,index) => {
            return (
              <LabelContainer color={() => getBackgroundColor(theme, item)} key={index}>
                <label>
                  <input
                    type="radio"
                    name={item}
                    value={item}
                    checked={cardCategory === item}
                    onChange={(e) =>
                      setCardCategory(e.currentTarget.value as ICategory)
                    }
                  />
                  <i>{item}</i>
                </label>
              </LabelContainer>
            );
          })}
        </CategoriesContainer>
        <Button type="button" onClick={handleSave}>
          {selectedCard ? "Save Changes" : "Add card to Backlog"}
        </Button>
      </ModalContent>
    </Container>
  );
};
export default Modal
