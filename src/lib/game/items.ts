export const items = [
    {
        "name": "Heal Potion",
        "type": "defend",
        "description": "สามารถ heal ตัวเองได้ ใน round นั้นทันที 20 หน่วยทัน",
        "price": 20,
        "image": "/assets/items/Heal Potion.png"
    },
    {
        "name": "Fortune's Blade",
        "type": "attack",
        "description": "โจมตีผู้เล่นใดก็ได้ที่อยู่ช่องใกล้เคียงในระยะ 5 ช่องโดยจะลด hp ผู้เล่นที่เลือกถึง 30 หน่วย แต่มีโอกาศ 20% ที่จะโดนดาเมจเอง",
        "price": 20,
        "image": "/assets/items/Fortune's Blade.png"
    },
    {
        "name": "Araxy Bow",
        "type": "attack",
        "description": "สามารถเลือกผู้เล่นจากที่ใดก็ได้ลด hp ผู้เล่นที่เลือก 15 หน่วย",
        "price": 15,
        "image": "/assets/items/Araxys Bow.png"

    },
    {
        "name": "Love Potion",
        "type": "defend",
        "description": "สามารถ heal ผู้เล่นคนอื่นได้ยกเว้น ตัวเอง จำนวน 10 หน่วย รักกันไว้นะ :)",
        "price": 10,
        "image": "/assets/items/Love Potion.png"
    },
    {
        "name": "Poison Dagger",
        "type": "attack",
        "description": "เลือกโจมตีผู้เล่น ลด hp 20 หน่วยทั้งผู้ใช้ไอเท็ม และผู้ถูกโจมตีจะติดพิษ ลด hp ทีละ 5 หน่วยเป็นเวลา 3 round",
        "price": 20,
        "image": "/assets/items/Poison Dagger.png"
    },
    {
        "name": "Small Heal Potion",
        "type": "defend",
        "description": "สามารถ heal ตัวเองได้โดยจะ heal round ละ 5 หน่วย เป็นเวลา 3 round",
        "price": 15,
        "image": "/assets/items/Small Heal Potion.png"
    },
    {
        "name": "Destiny Dice",
        "type": "attack",
        "description": "เลือกผู้เล่นที่จะโจมตี และ ทอยลูกเต๋า โดยดาเมจที่ ผู้เล่นที่เลือกจะได้รับจะขึ้นอยู่กับจำนวนเลขที่ทอยได้แต่ถ้าทอยน้อยกว่า 3 ดาเมจจะเข้าตัวเองตามที่ทอยได้",
        "price": 10,
        "image": "/assets/items/Destiny Dice.png"
    },
    {
        "name": "Blood of PadadoomdoomPoom",
        "type": "attack",
        "description": "เลือกดูดเลือดใครก็ได้ในแมพ 10 หน่วย และ ผู้เล่นที่ถูกเดือดเลือด hp จะลด 10 หน่วย",
        "price": 25,
        "image": "/assets/items/Blood of PadadoomdoomPoom.png"
    },
    {
        "name": "Arcane Shield",
        "type": "defend",
        "description": "สามารถกันการโจมตีของผู้เล่นคนอื่นได้ทุกการโจมตีใน round ถัดไป และการป้องกันจะหายทันทีถ้า round ถัดไปไม่โดนโจมตี",
        "price": 30,
        "image": "/assets/items/Arcane Shield.png"
    },
    {
        "name": "Antidote",
        "type": "defend",
        "description": "สามารถล้างพิษจาก Poison Daggerได้ใน round ถัดไป",
        "price": 10,
        "image": "/assets/items/Antidote.png"
    },
    {
        "name": "Ender Pearl",
        "type": "special",
        "description": "สามารถ teleport ไปไหนก็ได้ภายในระยะ 10 ช่อง นับจากจุดยืนของผู้เล่น",
        "image": "/assets/items/Ender Pearl.png"
    },
    {
        "name": "Magic Mushrooms",
        "type": "special",
        "description": "จะ teleport ผู้ที่ใช้ item นี้ไปยังพื้นที่อื่นแบบสุ่ม ถ้าตกลงพื้นที่ที่มี effect ก็จะเกิด effect นั้นทันที",
        "image": "/assets/items/Magic Msuhrooms.png"
    },
    {
        "name": "Theif",
        "type": "special",
        "description": "สามารถขโมยเงินของผู้เล่นคนไหนก็ได้เป็นจำนวน 15 Momo coin",
        "image": "/assets/items/Theif.png"

    },
    {
        "name": "x2 Momo coin",
        "type": "special",
        "description": "จะได้รับ Momo coin x2 ใน round นี้ item ชินนี้ มีผลเมื่อเจอพื้นที่ boss กับ monster เท่านั้น และผลจะหายไปถ้าแพ้ monster หรือ boss (ผลยังคงอยู่แม้เปลี่ยน round)",
        "image": "/assets/items/x2 Momo.png"
    }
] 