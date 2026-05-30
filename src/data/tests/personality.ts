export const personalityTest = {

  id: "personality",

  title: "Personality Assessment",

  description:
    "Understand your behavior patterns, leadership style, emotional tendencies, and work personality.",

  category: "core",

  estimatedTime: 12,

  questions: [
        {
            id : "personality_1",
            "question": "You join a new project team where nobody knows each other well yet. What role do you naturally take in the first few meetings?",
            "options": [
            {
                id : "a",
                "text": "I start connecting people and making sure everyone feels included.",
                "traits": ["social", "empathetic", "communicative"]
            },
            {
                id : "b",
                "text": "I focus on understanding the project structure and possible challenges.",
                "traits": ["analytical", "strategic", "logical"]
            },
            {
                id : "c",
                "text": "I quickly organize tasks and timelines so the team can move efficiently.",
                "traits": ["organized", "leadership", "detail_oriented"]
            },
            {
                id : "d",
                "text": "I suggest fresh ideas or unconventional approaches to stand out.",
                "traits": ["creative", "innovative", "independent"]
            }
            ]
        },
        {
            id : "personality_2",
            "question": "A teacher or manager gives very vague instructions for an important assignment. What do you do first?",
            "options": [
            {
                id : "a",
                "text": "Break the task into smaller parts and create my own structured plan.",
                "traits": ["organized", "strategic", "detail_oriented"]
            },
            {
                id : "b",
                "text": "Experiment with different possibilities and shape the project creatively.",
                "traits": ["creative", "innovative", "visual"]
            },
            {
                id : "c",
                "text": "Ask thoughtful questions to fully understand expectations.",
                "traits": ["communicative", "logical", "analytical"]
            },
            {
                id : "d",
                "text": "Work independently and adapt as I learn more during the process.",
                "traits": ["independent", "adaptable", "technical"]
            }
            ]
        },
        {
            id : "personality_3",
            "question": "Your team suddenly loses a key member right before a deadline. How do you react?",
            "options": [
            {
                id : "a",
                "text": "Step up to coordinate everyone and redistribute responsibilities.",
                "traits": ["leadership", "organized", "strategic"]
            },
            {
                id : "b",
                "text": "Stay calm and focus on solving the most critical technical problems first.",
                "traits": ["technical", "logical", "analytical"]
            },
            {
                id : "c",
                "text": "Keep team morale high and support stressed teammates emotionally.",
                "traits": ["empathetic", "social", "communicative"]
            },
            {
                id : "d",
                "text": "Adjust quickly and look for creative shortcuts or smarter alternatives.",
                "traits": ["adaptable", "innovative", "creative"]
            }
            ]
        },
        {
            id : "personality_4",
            "question": "You have a free weekend with no obligations. Which activity sounds most fulfilling?",
            "options": [
            {
                id : "a",
                "text": "Building, fixing, or learning something practical or technical.",
                "traits": ["technical", "logical", "independent"]
            },
            {
                id : "b",
                "text": "Planning future goals or improving personal systems and routines.",
                "traits": ["organized", "strategic", "detail_oriented"]
            },
            {
                id : "c",
                "text": "Creating content, art, designs, or exploring new ideas.",
                "traits": ["creative", "visual", "innovative"]
            },
            {
                id : "d",
                "text": "Spending meaningful time with people and having deep conversations.",
                "traits": ["social", "empathetic", "communicative"]
            }
            ]
        },
        {
            id : "personality_5",
            "question": "During a debate, someone strongly disagrees with your idea. What is your usual response?",
            "options": [
            {
                id : "a",
                "text": "Defend my reasoning with data and logic.",
                "traits": ["logical", "analytical", "strategic"]
            },
            {
                id : "b",
                "text": "Listen carefully and try to understand their perspective first.",
                "traits": ["empathetic", "communicative", "social"]
            },
            {
                id : "c",
                "text": "Adapt the idea by combining the strongest parts of both viewpoints.",
                "traits": ["adaptable", "innovative", "creative"]
            },
            {
                id : "d",
                "text": "Keep the discussion focused and move the group toward a decision.",
                "traits": ["leadership", "organized", "detail_oriented"]
            }
            ]
        },
        {
            id : "personality_6",
            "question": "You are given the chance to lead a student or workplace initiative. What excites you most?",
            "options": [
            {
                id : "a",
                "text": "Creating a long-term vision and strategy for success.",
                "traits": ["leadership", "strategic", "analytical"]
            },
            {
                id : "b",
                "text": "Helping individuals grow and work well together.",
                "traits": ["empathetic", "social", "communicative"]
            },
            {
                id : "c",
                "text": "Designing something original that makes the project memorable.",
                "traits": ["creative", "visual", "innovative"]
            },
            {
                id : "d",
                "text": "Optimizing systems, tools, and workflows for efficiency.",
                "traits": ["technical", "organized", "detail_oriented"]
            }
            ]
        },
        {
            id : "personality_7",
            "question": "A sudden change completely disrupts your plans for the month. What best describes your reaction?",
            "options": [
            {
                id : "a",
                "text": "I quickly adjust and treat it as a new opportunity.",
                "traits": ["adaptable", "innovative", "independent"]
            },
            {
                id : "b",
                "text": "I create a revised plan to regain structure and control.",
                "traits": ["organized", "strategic", "detail_oriented"]
            },
            {
                id : "c",
                "text": "I analyze what caused the disruption before moving forward.",
                "traits": ["analytical", "logical", "technical"]
            },
            {
                id : "d",
                "text": "I discuss it with others and seek collaborative solutions.",
                "traits": ["social", "communicative", "empathetic"]
            }
            ]
        },
        {
            id : "personality_8",
            "question": "When learning something difficult, what method works best for you?",
            "options": [
            {
                id : "a",
                "text": "Understanding the theory and logic behind how it works.",
                "traits": ["logical", "analytical", "technical"]
            },
            {
                id : "b",
                "text": "Using visuals, examples, or hands-on experimentation.",
                "traits": ["visual", "creative", "innovative"]
            },
            {
                id : "c",
                "text": "Breaking it into organized steps and practicing consistently.",
                "traits": ["organized", "detail_oriented", "strategic"]
            },
            {
                id : "d",
                "text": "Learning through discussion, collaboration, or teaching others.",
                "traits": ["communicative", "social", "empathetic"]
            }
            ]
        },
        {
            id : "personality_9",
            "question": "Your friend group is struggling to make an important decision together. What do you naturally do?",
            "options": [
            {
                id : "a",
                "text": "Guide the conversation toward a final decision.",
                "traits": ["leadership", "communicative", "strategic"]
            },
            {
                id : "b",
                "text": "Make sure everyone's opinions are heard fairly.",
                "traits": ["empathetic", "social", "organized"]
            },
            {
                id : "c",
                "text": "Evaluate the pros and cons of each option logically.",
                "traits": ["analytical", "logical", "detail_oriented"]
            },
            {
                id : "d",
                "text": "Suggest a completely different solution nobody considered.",
                "traits": ["innovative", "creative", "independent"]
            }
            ]
        },
        {
            id : "personality_10",
            "question": "You notice a process at school or work that wastes a lot of time. What are you most likely to do?",
            "options": [
            {
                id : "a",
                "text": "Design a more efficient system or workflow.",
                "traits": ["organized", "strategic", "technical"]
            },
            {
                id : "b",
                "text": "Suggest creative improvements that make the experience better.",
                "traits": ["creative", "innovative", "visual"]
            },
            {
                id : "c",
                "text": "Collect evidence and explain logically why changes are needed.",
                "traits": ["analytical", "logical", "communicative"]
            },
            {
                id : "d",
                "text": "Quietly adjust my own way of working instead of changing the system.",
                "traits": ["independent", "adaptable", "detail_oriented"]
            }
            ]
        },
        {
            id : "personality_11",
            "question": "Which type of recognition feels most meaningful to you?",
            "options": [
            {
                id : "a",
                "text": "Being respected for leadership and responsibility.",
                "traits": ["leadership", "organized", "strategic"]
            },
            {
                id : "b",
                "text": "Being appreciated for creativity and originality.",
                "traits": ["creative", "innovative", "visual"]
            },
            {
                id : "c",
                "text": "Being known as reliable, precise, and technically skilled.",
                "traits": ["technical", "detail_oriented", "logical"]
            },
            {
                id : "d",
                "text": "Being valued for understanding and helping others.",
                "traits": ["empathetic", "social", "communicative"]
            }
            ]
        },
        {
            id : "personality_12",
            "question": "A project you worked hard on receives harsh criticism. What is your first instinct?",
            "options": [
            {
                id : "a",
                "text": "Analyze the feedback carefully and improve the weak areas.",
                "traits": ["analytical", "detail_oriented", "logical"]
            },
            {
                id : "b",
                "text": "Stay confident and continue experimenting with new ideas.",
                "traits": ["creative", "innovative", "independent"]
            },
            {
                id : "c",
                "text": "Ask for clarification and discuss the feedback openly.",
                "traits": ["communicative", "social", "empathetic"]
            },
            {
                id : "d",
                "text": "Refocus the team and create a stronger action plan.",
                "traits": ["leadership", "organized", "strategic"]
            }
            ]
        },
        {
            id : "personality_13",
            "question": "Imagine you are starting a new career path. What matters most to you?",
            "options": [
            {
                id : "a",
                "text": "Freedom to explore ideas and create meaningful work.",
                "traits": ["creative", "independent", "innovative"]
            },
            {
                id : "b",
                "text": "Clear growth opportunities and strong long-term impact.",
                "traits": ["strategic", "leadership", "organized"]
            },
            {
                id : "c",
                "text": "Challenging problems that require deep thinking and skill.",
                "traits": ["technical", "analytical", "logical"]
            },
            {
                id : "d",
                "text": "Positive relationships and a supportive environment.",
                "traits": ["social", "empathetic", "communicative"]
            }
            ]
        },
        {
            id : "personality_14",
            "question": "You are working under pressure with very limited time. How do you usually operate?",
            "options": [
            {
                id : "a",
                "text": "Prioritize tasks methodically and focus on execution.",
                "traits": ["organized", "detail_oriented", "strategic"]
            },
            {
                id : "b",
                "text": "Think quickly and improvise creative solutions.",
                "traits": ["adaptable", "creative", "innovative"]
            },
            {
                id : "c",
                "text": "Remain calm by focusing only on facts and logic.",
                "traits": ["logical", "analytical", "technical"]
            },
            {
                id : "d",
                "text": "Coordinate closely with others to maintain momentum.",
                "traits": ["communicative", "leadership", "social"]
            }
            ]
        },
        {
            id : "personality_15",
            "question": "When entering an unfamiliar environment, what do you notice first?",
            "options": [
            {
                id : "a",
                "text": "The atmosphere and how people interact.",
                "traits": ["social", "empathetic", "communicative"]
            },
            {
                id : "b",
                "text": "The structure, organization, and workflow.",
                "traits": ["organized", "detail_oriented", "strategic"]
            },
            {
                id : "c",
                "text": "The systems, tools, or technical details involved.",
                "traits": ["technical", "analytical", "logical"]
            },
            {
                id : "d",
                "text": "The design, aesthetics, or opportunities for improvement.",
                "traits": ["visual", "creative", "innovative"]
            }
            ]
        },
        {
            id : "personality_16",
            "question": "A group project becomes chaotic because nobody agrees on priorities. What do you contribute?",
            "options": [
            {
                id : "a",
                "text": "I establish a clear direction and assign responsibilities.",
                "traits": ["leadership", "organized", "strategic"]
            },
            {
                id : "b",
                "text": "I encourage open discussion so everyone feels heard.",
                "traits": ["empathetic", "social", "communicative"]
            },
            {
                id : "c",
                "text": "I identify the most logical path using facts and analysis.",
                "traits": ["analytical", "logical", "detail_oriented"]
            },
            {
                id : "d",
                "text": "I rethink the problem from a fresh perspective.",
                "traits": ["creative", "innovative", "adaptable"]
            }
            ]
        },
        {
            id : "personality_17",
            "question": "Which situation would motivate you the most?",
            "options": [
            {
                id : "a",
                "text": "Building something entirely new from scratch.",
                "traits": ["innovative", "creative", "independent"]
            },
            {
                id : "b",
                "text": "Managing a high-performing team toward a major goal.",
                "traits": ["leadership", "strategic", "communicative"]
            },
            {
                id : "c",
                "text": "Solving a difficult technical or analytical challenge.",
                "traits": ["technical", "logical", "analytical"]
            },
            {
                id : "d",
                "text": "Helping people grow, connect, or overcome struggles.",
                "traits": ["empathetic", "social", "communicative"]
            }
            ]
        },
        {
            id : "personality_18",
            "question": "You are asked to present an idea to an audience. What approach feels most natural?",
            "options": [
            {
                id : "a",
                "text": "Use storytelling and visuals to make it memorable.",
                "traits": ["visual", "creative", "communicative"]
            },
            {
                id : "b",
                "text": "Present facts, logic, and structured reasoning clearly.",
                "traits": ["logical", "analytical", "organized"]
            },
            {
                id : "c",
                "text": "Engage the audience through interaction and discussion.",
                "traits": ["social", "empathetic", "leadership"]
            },
            {
                id : "d",
                "text": "Demonstrate practical implementation or technical proof.",
                "traits": ["technical", "detail_oriented", "independent"]
            }
            ]
        },
        {
            id : "personality_19",
            "question": "What usually drains your energy the fastest?",
            "options": [
            {
                id : "a",
                "text": "Strict routines with no room for creativity.",
                "traits": ["creative", "innovative", "independent"]
            },
            {
                id : "b",
                "text": "Disorganized environments with unclear expectations.",
                "traits": ["organized", "detail_oriented", "strategic"]
            },
            {
                id : "c",
                "text": "Shallow communication or lack of teamwork.",
                "traits": ["social", "empathetic", "communicative"]
            },
            {
                id : "d",
                "text": "Inefficient thinking or poorly reasoned decisions.",
                "traits": ["logical", "analytical", "technical"]
            }
            ]
        },
        {
            id : "personality_20",
            "question": "If you had to mentor someone younger than you, what would you focus on most?",
            "options": [
            {
                id : "a",
                "text": "Helping them build confidence and emotional awareness.",
                "traits": ["empathetic", "communicative", "social"]
            },
            {
                id : "b",
                "text": "Teaching them discipline, planning, and responsibility.",
                "traits": ["organized", "leadership", "detail_oriented"]
            },
            {
                id : "c",
                "text": "Encouraging originality and independent thinking.",
                "traits": ["creative", "innovative", "independent"]
            },
            {
                id : "d",
                "text": "Developing problem-solving and analytical skills.",
                "traits": ["analytical", "logical", "technical"]
            }
            ]
        },
        {
            id : "personality_21",
            "question": "You discover an opportunity that involves significant uncertainty but high potential reward. What do you do?",
            "options": [
            {
                id : "a",
                "text": "Take the risk if the vision feels exciting and original.",
                "traits": ["innovative", "creative", "adaptable"]
            },
            {
                id : "b",
                "text": "Carefully evaluate long-term outcomes before deciding.",
                "traits": ["strategic", "analytical", "logical"]
            },
            {
                id : "c",
                "text": "Seek advice from trusted people before committing.",
                "traits": ["social", "communicative", "empathetic"]
            },
            {
                id : "d",
                "text": "Prepare a backup plan so the risk stays manageable.",
                "traits": ["organized", "detail_oriented", "leadership"]
            }
            ]
        },
        {
            id : "personality_22",
            "question": "When working independently, what keeps you most motivated?",
            "options": [
            {
                id : "a",
                "text": "Freedom to experiment and create without restrictions.",
                "traits": ["independent", "creative", "innovative"]
            },
            {
                id : "b",
                "text": "A clear system of goals and measurable progress.",
                "traits": ["organized", "strategic", "detail_oriented"]
            },
            {
                id : "c",
                "text": "The challenge of solving complex problems efficiently.",
                "traits": ["technical", "logical", "analytical"]
            },
            {
                id : "d",
                "text": "Knowing my work will positively affect other people.",
                "traits": ["empathetic", "social", "communicative"]
            }
            ]
        },
        {
            id : "personality_23",
            "question": "A team member is underperforming and affecting the group's success. How would you handle it?",
            "options": [
            {
                id : "a",
                "text": "Talk privately to understand what they are struggling with.",
                "traits": ["empathetic", "communicative", "social"]
            },
            {
                id : "b",
                "text": "Set clearer expectations and accountability measures.",
                "traits": ["leadership", "organized", "strategic"]
            },
            {
                id : "c",
                "text": "Analyze the workflow to identify where the process failed.",
                "traits": ["analytical", "logical", "detail_oriented"]
            },
            {
                id : "d",
                "text": "Adapt responsibilities based on each person's strengths.",
                "traits": ["adaptable", "innovative", "creative"]
            }
            ]
        },
        {
            id : "personality_24",
            "question": "What kind of challenge would you most enjoy solving?",
            "options": [
            {
                id : "a",
                "text": "Designing a product or idea nobody has seen before.",
                "traits": ["creative", "innovative", "visual"]
            },
            {
                id : "b",
                "text": "Leading a complex mission with multiple moving parts.",
                "traits": ["leadership", "strategic", "organized"]
            },
            {
                id : "c",
                "text": "Optimizing a complicated system for better performance.",
                "traits": ["technical", "analytical", "detail_oriented"]
            },
            {
                id : "d",
                "text": "Improving communication and trust within a group.",
                "traits": ["social", "empathetic", "communicative"]
            }
            ]
        },
        {
            id : "personality_25",
            "question": "Looking ahead five years, what would make you feel most fulfilled?",
            "options": [
            {
                id : "a",
                "text": "Creating work that reflects my originality and ideas.",
                "traits": ["creative", "independent", "visual"]
            },
            {
                id : "b",
                "text": "Becoming highly skilled and respected in my field.",
                "traits": ["technical", "logical", "detail_oriented"]
            },
            {
                id : "c",
                "text": "Leading impactful projects or organizations.",
                "traits": ["leadership", "strategic", "organized"]
            },
            {
                id : "d",
                "text": "Building meaningful relationships and helping others grow.",
                "traits": ["empathetic", "social", "communicative"]
            }
            ]
        },
        {
            id: "personality_depth_1",
            "question": "You are offered two equally attractive opportunities. Which feels more difficult to give up?",
            "options": [
                {
                id: "a",
                "text": "Freedom to explore creative and unconventional ideas.",
                "traits": ["creative", "innovative", "independent"],
                },
                {
                id: "b",
                "text": "The chance to lead and influence important decisions.",
                "traits": ["leadership", "strategic", "communicative"],
                },
                {
                id: "c",
                "text":"The opportunity to master difficult systems or challenges.",
                "traits": ["technical", "analytical", "logical"],
                },
                {
                id: "d",
                "text":"Building strong relationships and helping people grow.",
                "traits": ["empathetic", "social", "communicative"],
                },
            ],
        }
    ],
}