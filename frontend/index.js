const BoxChat = document.getElementById("Chat");
const Kirim = document.getElementById("Kirim");
const Input = document.getElementById("Input");

const sendMessage = async () => {
  const Isi = Input.value.trim();
  if (Isi === "") return;
  Input.value = "";
  Kirim.disabled = true;
  Input.disabled = true;
  AddChatMe(Isi);

  try {
    const response = await fetch(`${CONFIG.API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: Isi }),
    });
    if (!response.ok) throw new Error("Network Ga Bagus");

    const data = await response.json();
    AddChatBot(data.reply);
  } catch (error) {
    console.log(error);
  } finally {
    Kirim.disabled = false;
    Input.disabled = false;
  }
};

Kirim.addEventListener("click", () => {
  sendMessage();
});

Input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

const AddChatMe = (text) => {
  const wrapper = document.createElement("div");
  wrapper.className = "flex justify-end w-full mb-2";

  const bubble = document.createElement("div");
  bubble.className =
    "bg-blue-500 text-white px-3 py-2 rounded-2xl rounded-br-sm max-w-xs mt-3 mb-3";
  bubble.innerText = text;
  wrapper.appendChild(bubble);
  BoxChat.appendChild(wrapper);
};

const AddChatBot = (text) => {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-row gap-2";

  const bubble = document.createElement("div");
  bubble.className = "bg-white rounded-t-xl p-2 rounded-br-xl ";
  bubble.innerText = text;

  const image = document.createElement("img");
  image.className = "w-7 h-7 object-cover rounded-full";
  image.src =
    "https://www.cio.com/wp-content/uploads/2025/12/189347-0-83263200-1765762375-chatbot_ai_machine-learning_emerging-tech-100778305-orig.jpg?quality=50&strip=all&w=1024";
  wrapper.appendChild(image);
  wrapper.appendChild(bubble);
  BoxChat.appendChild(wrapper);
};
