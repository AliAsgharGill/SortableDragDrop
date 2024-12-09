import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { DragAndDropLists } from "./components/DragDropList";

interface ItemType {
  id: number;
  name: string;
}

const App: FC = () => {

  return (
    <>
      <DragAndDropLists />
    </>
  );
};

export default App;
