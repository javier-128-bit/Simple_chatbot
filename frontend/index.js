const BoxChat = document.getElementById("Chat");
const Kirim = document.getElementById("Kirim");
const Input = document.getElementById("Input");

console.log(CONFIG.API_URL);
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
    "https://media.licdn.com/dms/image/v2/D5603AQEp1SXpWsd1Aw/profile-displayphoto-scale_400_400/B56Z2USKxIKEAg-/0/1776309289807?e=1779321600&v=beta&t=RqYlKgNi9O756MtF3SryHJHvCwTuWpJTOmEbB0Oa9Ek";
  wrapper.appendChild(image);
  wrapper.appendChild(bubble);
  BoxChat.appendChild(wrapper);
};
