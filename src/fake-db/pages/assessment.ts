import { Assessment } from "@/types/assessmentTypes";

// Sample assessment data
export const db: Assessment = [
  {
    category: "Business Concept",
    totalQuestions: 4,
    totalAnsweredQuestions: 4,
    subCategories: [
      {
        name: "Business Idea",
        totalQuestions: 2,
        totalAnsweredQuestions: 2,
        questions: [
          {
            question: "How unique is your business idea?",
            options: ["Not unique", "Somewhat unique", "Highly unique"],
          },
          {
            question: "How scalable is your business idea?",
            options: ["Not scalable", "Somewhat scalable", "Highly scalable"],
          },
        ],
      },
      {
        name: "Product Portfolio",
        totalQuestions: 2,
        totalAnsweredQuestions: 0,
        questions: [
          {
            question: "Do you offer a range of products/services?",
            options: ["Yes", "No", "Planning to"],
          },
          {
            question: "How diverse is your product portfolio?",
            options: ["Very diverse", "Somewhat", "Not diverse"],
          },
        ],
      },
    ],
  },
  {
    category: "Business Model",
    totalQuestions: 4,
    totalAnsweredQuestions: 0,
    subCategories: [
      {
        name: "Revenue Model",
        totalQuestions: 2,
        totalAnsweredQuestions: 0,
        questions: [
          {
            question: "Is your revenue model sustainable?",
            options: ["Yes", "No", "Not sure"],
          },
          {
            question: "Have you validated pricing?",
            options: ["Yes", "Partially", "No"],
          },
        ],
      },
      {
        name: "Cost Structure",
        totalQuestions: 2,
        totalAnsweredQuestions: 0,
        questions: [
          {
            question: "Are your costs scalable?",
            options: ["Yes", "Somewhat", "No"],
          },
          {
            question: "Do you track fixed vs variable costs?",
            options: ["Yes", "No", "Planning to"],
          },
        ],
      },
    ],
  },
  {
    category: "Market Analysis",
    totalQuestions: 4,
    totalAnsweredQuestions: 0,
    subCategories: [
      {
        name: "Target Market",
        totalQuestions: 2,
        totalAnsweredQuestions: 0,
        questions: [
          {
            question: "Have you clearly defined your target market?",
            options: ["Yes", "Partially", "No"],
          },
          {
            question: "How large is your addressable market?",
            options: ["Small", "Medium", "Large"],
          },
        ],
      },
      {
        name: "Competition",
        totalQuestions: 2,
        totalAnsweredQuestions: 0,
        questions: [
          {
            question: "How would you rate the competitive landscape?",
            options: [
              "Highly competitive",
              "Moderately competitive",
              "Limited competition",
            ],
          },
          {
            question: "Do you have a competitive advantage?",
            options: [
              "Strong advantage",
              "Some advantage",
              "No clear advantage",
            ],
          },
        ],
      },
    ],
  },
  {
    category: "Team & Resources",
    totalQuestions: 4,
    totalAnsweredQuestions: 0,
    subCategories: [
      {
        name: "Team Composition",
        totalQuestions: 2,
        totalAnsweredQuestions: 0,
        questions: [
          {
            question: "Does your team have diverse skill sets?",
            options: ["Yes", "Somewhat", "No"],
          },
          {
            question: "Do you have industry experience in your team?",
            options: ["Extensive", "Some", "None"],
          },
        ],
      },
      {
        name: "Resource Allocation",
        totalQuestions: 2,
        totalAnsweredQuestions: 0,
        questions: [
          {
            question:
              "Do you have sufficient resources for the next 12 months?",
            options: ["Yes", "Partially", "No"],
          },
          {
            question: "How efficiently are you using your resources?",
            options: ["Very efficiently", "Moderately", "Inefficiently"],
          },
        ],
      },
    ],
  },
  {
    category: "Growth Strategy",
    totalQuestions: 4,
    totalAnsweredQuestions: 0,
    subCategories: [
      {
        name: "Expansion Plans",
        totalQuestions: 2,
        totalAnsweredQuestions: 0,
        questions: [
          {
            question: "Do you have a clear growth roadmap?",
            options: ["Yes", "Partial", "No"],
          },
          {
            question: "Are you planning to enter new markets?",
            options: [
              "Yes, within 1 year",
              "Yes, within 3 years",
              "No plans yet",
            ],
          },
        ],
      },
      {
        name: "Investment Strategy",
        totalQuestions: 2,
        totalAnsweredQuestions: 0,
        questions: [
          {
            question: "Are you seeking external funding?",
            options: ["Yes, actively", "Considering options", "No"],
          },
          {
            question: "How do you plan to reinvest profits?",
            options: ["Product development", "Market expansion", "Team growth"],
          },
        ],
      },
    ],
  },
];
