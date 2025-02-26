import { ProChat } from "@ant-design/pro-chat"

import { useTheme } from "antd-style"
import { useEffect, useState } from "react"

export default () => {
  const theme = useTheme()
  const [step, setStep] = useState(4)
  const [userData, setUserData] = useState({
    name: "",
    birthYear: "",
    email: "",
    experience: "",
    investmentType: [],
    investmentStrategy: "",
    savings: "",
    riskTolerance: ""
  })

  const handleInvestmentSelection = (reply: string): string => {
    const investmentOptions: Record<number, string> = {
      1: "Stocks",
      2: "Bonds",
      3: "Mutual Funds",
      4: "Cryptocurrency",
      5: "ETFs",
      6: "Leverage & Margin"
    }

    // Ensure only valid numeric inputs
    const selectedNumbers = reply
      .split("")
      .map((num) => parseInt(num, 10))
      .filter((num) => !isNaN(num) && investmentOptions[num])

    return selectedNumbers.map((num) => investmentOptions[num]).join(", ")
  }

  const mapInvestmentStrategy = (choice: number): string => {
    const strategies: Record<number, string> = {
      1: "Growth Investor",
      2: "Dividend Investor",
      3: "Balanced Portfolio",
      4: "Speculative Trader"
    }

    return strategies[choice] || "Invalid choice"
  }
  // Example usage
  function mapSavingRate(option: 1 | 2 | 3): string {
    const mapping: Record<1 | 2 | 3, string> = {
      1: "above 20%",
      2: "10-20%",
      3: "0-10%"
    }

    return mapping[option] ?? "Invalid option"
  }

  // Example usage

  useEffect(() => {
    console.log(userData)
  }, [userData])
  // Runs when userData updates
  return (
    <div
      style={{
        background: theme.colorBgLayout,
        height: "80vh",
        width: "80vw"
      }}
    >
      <ProChat
        //   helloMessage={
        //     'This is a custom message that supports Markdown messages, such as：[ProChat](https://github.com/ant-design/pro-chat)'
        //   }

        placeholder="Type your message here..."
        helloMessage={
          <div
            style={{ fontSize: "16px", color: "#333" }}
            className="text-start"
          >
            <p>
              Hey there! 👋 I'm your <b>personal AI financial coach</b>.
            </p>
            <p>
              My goal is to help you{" "}
              <b style={{ color: "green" }}>reach RM100,000 in savings</b>. 🚀
            </p>
            <p>
              Before we start, let me ask you a few quick questions to{" "}
              <i>personalize</i> my advice.
            </p>
            <ul className="mt-2">
              <li>
                💰 <b>Type 'YES' to begin your journey!</b>
              </li>
            </ul>
          </div>
        }
        request={async (messages) => {
          console.log(messages)
          // Mock API response (Replace with actual AI model later)
          const lastMessage: any = messages[messages.length - 1]?.content
          console.log(lastMessage)

          let responseText: any = "Please try again" // Default response

          if (!lastMessage) {
            return new Response(JSON.stringify(responseText))
          }

          if (lastMessage === "0") {
            setStep(0)
          }

          switch (step) {
            case 0:
              if (lastMessage.toUpperCase() === "YES") {
                responseText =
                  "Awesome! Let's start. What's your **first name**? 😊"
                setStep(1)
              } else {
                responseText = "Type 'YES' to begin! 🚀"
              }
              break

            case 1:
              if (lastMessage.length > 1) {
                setUserData((prev) => ({ ...prev, name: lastMessage }))
                responseText = `Nice to meet you, **${lastMessage}**! 🎉 Now, what year were you born? (e.g., 1995)`
                setStep(2)
              } else {
                responseText = "Please enter a valid name."
              }
              break

            case 2:
              const birthYear = parseInt(lastMessage)
              if (
                !isNaN(birthYear) &&
                birthYear > 1900 &&
                birthYear < new Date().getFullYear()
              ) {
                setUserData((prev) => ({ ...prev, birthYear: lastMessage }))
                responseText = "Got it! Now, what's your **email address**? 📧"
                setStep(3)
              } else {
                responseText =
                  "Hmm, that doesn't look like a valid birth year. Try again!"
              }
              break

            case 3:
              if (lastMessage.includes("@") && lastMessage.includes(".")) {
                setUserData((prev) => ({ ...prev, email: lastMessage }))
                setStep(4) // Ensure step updates immediately

                responseText =
                  "Thank you for providing your information. \n\n My goal is to help you **reach RM100,000 in savings**. 🚀\n\nBefore we start, let me ask you a few quick questions to *personalize* my advice.\n\n💰 **Type 'OK' to continue your journey!**"
              } else {
                responseText =
                  "Oops! That doesn't look like a valid email. Try again! 📩 "
              }
              break

            case 4:
              if (lastMessage.toUpperCase() === "OK") {
                responseText =
                  "Great! Let's assess your investment knowledge. How would you describe your experience? \n\n" +
                  "1️⃣ **Beginner** - New to investing\n\n2️⃣ **Intermediate** - Know the basics\n\n3️⃣ **Advanced** - Actively invest\n\nType **1, 2, or 3** to continue."

                setStep(5)
              } else {
                responseText = "Type 'OK' to continue your journey! 🚀"
              }
              break

            case 5:
              if (["1", "2", "3"].includes(lastMessage)) {
                const mapExperienceLevel = (input: string): string => {
                  const experienceMap: Record<string, string> = {
                    "1": "Beginner",
                    "2": "Intermediate",
                    "3": "Advanced"
                  }

                  return experienceMap[input] || "Unknown"
                }

                setUserData((prev) => ({
                  ...prev,
                  experience: mapExperienceLevel(lastMessage)
                }))

                if (lastMessage === "1") {
                  responseText =
                    "Since you're new to investing, let's start with the basics. How much of your monthly income do you save?\n\n1️⃣ 💰 **20%+** (I’m a disciplined saver!)\n\n2️⃣ 💵 **10-20%** (I save when I can)\n\n3️⃣ 🛑 **0-10%** (I struggle to save)\n\nType **1, 2, or 3** to continue."
                  setStep(6) // Move to savings question
                } else if (lastMessage === "2") {
                  responseText =
                    "Great! Which of these investment terms do you understand? (Pick all that apply)\n\n1️⃣ ✅ **Stocks**\n\n2️⃣ ✅ **Bonds**\n\n3️⃣ ✅ **Mutual Funds**\n\n4️⃣ ✅ **Cryptocurrency** \n\n5️⃣ ✅ **ETFs**\n\n6️⃣ ✅ **Leverage & Margin**\n\nType The number of terms you understand to continue. **(eg: 1,2,5,7)**"
                  setStep(7) // Move to investment terms knowledge
                } else if (lastMessage === "3") {
                  responseText =
                    "Awesome! Since you're experienced, let's get straight to the point.\n\nHow would you describe your investment strategy?\n\n1️⃣ 📈 **Growth Investor** (I focus on high-growth stocks/crypto)\n\n2️⃣ 🏦 **Dividend Investor** (I prefer steady cash flow from dividends)\n\n3️⃣ 🔄 **Balanced Portfolio** (I mix stocks, bonds, and other assets)\n\n4️⃣ 💰 **Speculative Trader** (I take high risks for big returns)\n\nType **1, 2, 3 or 4** to continue."
                  setStep(8) // Move to risk tolerance and investment type
                }
              } else {
                responseText = "Please select 1️⃣, 2️⃣, or 3️⃣ to continue."
              }
              break

            case 6: // Handling savings question for beginners
              if (!isNaN(parseFloat(lastMessage))) {
                const savings = mapSavingRate(lastMessage)
                setUserData((prev) => ({ ...prev, savings: savings }))
                responseText =
                  "💡 Thanks for sharing so far! Now, let’s get a clearer picture of where you stand financially—no pressure, just to help tailor the best advice for you. 😊\n\n💰 What’s your estimated monthly income? **(e.g., RM4000)**\n\n💸 How much do you typically spend each month? **(e.g., RM2500)**\n\n🏦 How much have you saved so far? **(e.g., RM10,000)**\n\nJust reply with your numbers like this: **4000, 2500, 10000 (income, expenses, savings)**. If you're unsure, a rough estimate is totally fine!"
                setStep(9) // Move to risk tolerance for beginners
              } else {
                responseText =
                  "Hmm, that doesn't look like a valid number. Try again! 💰"
              }
              break

            case 7: // Handling investment knowledge for intermediates
              const selectedInvestments = handleInvestmentSelection(lastMessage)

              setUserData((prev: any) => ({
                ...prev,
                investmentType: selectedInvestments.split(", ") // Convert string back to an array
              }))

              responseText = responseText =
                "💡 Thanks for sharing so far! Now, let’s get a clearer picture of where you stand financially—no pressure, just to help tailor the best advice for you. 😊\n\n💰 What’s your estimated monthly income? **(e.g., RM4000)**\n\n💸 How much do you typically spend each month? **(e.g., RM2500)**\n\n🏦 How much have you saved so far? **(e.g., RM10,000)**\n\nJust reply with your numbers like this: **4000, 2500, 10000 (income, expenses, savings)**. If you're unsure, a rough estimate is totally fine!"
              setStep(9) // Move to risk tolerance question
              break

            case 8: // Handling risk tolerance & investment type for advanced users
              const data = mapInvestmentStrategy(lastMessage)
              setUserData((prev) => ({ ...prev, invedstmentStrategy: data }))
              responseText = responseText =
                "💡 Thanks for sharing so far! Now, let’s get a clearer picture of where you stand financially—no pressure, just to help tailor the best advice for you. 😊\n\n💰 What’s your estimated monthly income? **(e.g., RM4000)**\n\n💸 How much do you typically spend each month? **(e.g., RM2500)**\n\n🏦 How much have you saved so far? **(e.g., RM10,000)**\n\nJust reply with your numbers like this: **4000, 2500, 10000 (income, expenses, savings)**. If you're unsure, a rough estimate is totally fine!"
              setStep(9) // Move to detailed investment portfolio
              break

            case 9: // Handling risk tolerance for beginners and intermediates
              const [income, expenses, currentSavings] = lastMessage
                .split(",")
                .map((num: any) => parseFloat(num.trim()))

              if (isNaN(income) || isNaN(expenses) || isNaN(currentSavings)) {
                responseText =
                  "Oops! Please enter your numbers in this format: **4000, 2500, 10000 (income, expenses, savings)**."
              } else {
                const monthlySavings = income - expenses

                if (monthlySavings <= 0) {
                  responseText =
                    "Hmm... It looks like you're spending as much as (or more than) you earn. Consider reducing expenses or increasing income to save more. 😊"
                } else {
                  const remainingAmount = 100000 - currentSavings
                  const monthsNeeded = Math.ceil(
                    remainingAmount / monthlySavings
                  ) // Round up to full months

                  // Save data to userInfo state
                  setUserData((prev) => ({
                    ...prev,
                    income,
                    expenses,
                    currentSavings,
                    monthlySavings,
                    monthsNeeded
                  }))

                  responseText = `🎯 You will achieve **RM100,000** in **${monthsNeeded} months** with a monthly savings of **RM${monthlySavings}**. Keep going! 🚀\n\n💡 Want to reach your goal faster? Consider these options:\n\n📈 **High-Interest Savings Accounts** – Earn more on your savings.  \n\n📊 **Fixed Deposits** – Lock in higher returns.\n\n📉 **Low-Risk Investments** – Explore ETFs or Robo-advisors for steady growth.\n\nWould you like personalized recommendations? Just reply **"YES"** and I'll guide you! `
                  setStep(10)
                }
              }
              break

            case 10: // Handling user response to financial recommendations
              if (lastMessage.trim().toLowerCase() === "yes") {
                responseText = `🚀 Great! To fast-track your savings journey, check out these handpicked financial tools and strategies:  \n\n🔗 [Explore Financial Products](https://your-cta-page.com)  \n\nThese options can help you grow your savings faster with better returns. Let me know if you need further guidance! 😊`
              } else {
                responseText =
                  "No worries! If you ever need more guidance, feel free to ask. Keep going on your savings journey! 💪"
              }
              break
          }

          return new Response(
            responseText // Ensure responseText is always a string
          )
        }}
      />
    </div>
  )
}
