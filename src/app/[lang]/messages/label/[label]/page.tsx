// Component Imports
import MessagesWrapper from "@views/messages";

const MessagesLabelPage = ({ params }: { params: { label: string } }) => {
  return <MessagesWrapper label={params.label} />;
};

export default MessagesLabelPage;
