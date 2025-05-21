//common.tsx
import React from "react";
import { Customization } from "../hooks/useCustomizer";
interface Props {
  data : Customization,
  update :  <K extends keyof Customization>(key: K, value: Customization[K]) => void
}
const Comment: React.FC<Props> = ({data, update}) =>{
    return (
        <div className="mb-4">
          <input
          id="comment"
            type="text"
            className="input w-full mt-2 border focus:outline-0 focus:border-blue-500"
            placeholder={data.comment}
            onChange={e => update("comment", e.target.value as any)}
          />
        </div>
    )
}   

export default Comment;