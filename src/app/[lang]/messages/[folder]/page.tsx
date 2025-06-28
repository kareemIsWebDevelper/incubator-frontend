// Component Imports
import MessagesWrapper from '@/views/messages'

const EmailFolderPage = ({ params }: { params: { folder: string } }) => {
  return <MessagesWrapper folder={params.folder} />
}

export default EmailFolderPage
