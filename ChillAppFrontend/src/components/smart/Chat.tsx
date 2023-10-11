import { ChatSlot } from ".."

export const Chat = () => {

  const arr = [1,2,3]

  return (
    <div>
      {
        arr.map((el,i) => {
          return (<ChatSlot key={i} />)
        })
      }
    </div>
  )
}
