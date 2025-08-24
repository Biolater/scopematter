"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@heroui/button";

const TestApi = () => {
  const { getToken } = useAuth();

  // helper
  const callApi = async (id: string | null) => {
    const response = await fetch(
      id ? `http://localhost:5000/wallets/${id}` : `http://localhost:5000/wallets/`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log("DELETE", id, "→", data);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      {/* Case 1: invalid/missing ID */}
      <Button onPress={() => callApi(null)}>Case 1: Missing ID</Button>

      {/* Case 2: not found / not yours */}
      <Button onPress={() => callApi("nonexistent_id")}>
        Case 2: Non-existent Wallet
      </Button>

      {/* Case 3: delete primary (should fail) */}
      <Button onPress={() => callApi("cmefivojt0001dxw4iraykioh")}>
        Case 3: Delete Primary
      </Button>

      {/* Case 4: valid delete (secondary) */}
      <Button onPress={() => callApi("wallet2")}>
        Case 4: Delete Non-Primary
      </Button>
    </div>
  );
};

export default TestApi;