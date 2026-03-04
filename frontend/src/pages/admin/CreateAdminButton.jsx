import React from "react";
import { createAdmin } from "../../services/api";

export default function CreateAdminButton() {
  const handleCreate = () => {
    createAdmin("wilfordmtikwiri@gmail.com", "forHisGlory@3=1").then(console.log);
  };
  return (
    <button style={{margin:20,padding:10}} onClick={handleCreate}>
      Create Admin (Temp)
    </button>
  );
}
