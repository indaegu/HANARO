import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

function useCustomDisclosure() {
  const {
    isOpen,
    onOpen: baseOnOpen,
    onClose: baseOnClose,
    onToggle,
  } = useDisclosure();
  const [modalConfig, setModalConfig] = useState({
    title: "",
    minWidth: "50%",
    minHeight: "90%",
    content: <div />,
  });

  const onOpen = (title, minWidth, minHeight, content) => {
    setModalConfig({ title, minWidth, minHeight, content });
    baseOnOpen();
  };

  const onClose = () => {
    setModalConfig({
      title: "",
      minWidth: "50%",
      minHeight: "90%",
      content: <div />,
    });
    baseOnClose();
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    modalConfig,
  };
}

export { useCustomDisclosure };
