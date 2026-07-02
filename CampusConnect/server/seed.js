const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const dns = require("node:dns");

// Load env variables
dotenv.config();

// Set DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const User = require("./models/User");
const Skill = require("./models/Skill");
const Booking = require("./models/Booking");

const seedData = async () => {
  try {
    // Connect to database
    console.log("Connecting to MongoDB for seeding...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully 🚀");

    // Clear existing collections
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Skill.deleteMany({});
    await Booking.deleteMany({});

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password", salt);

    // Mock Users Data
    const usersData = [
      {
        name: "Alex Rivera",
        email: "alex@stanford.edu",
        password: hashedPassword,
        college: "Stanford University",
        city: "Stanford",
        bio: "CS senior with a passion for web technologies and peer mentorship. I've helped over 100 students master modern JavaScript frameworks.",
        skillsToTeach: ["Python", "Algorithms", "Git Version Control"],
        skillsToLearn: ["UI Design", "Figma Prototyping"]
      },
      {
        name: "Sarah Chen",
        email: "sarah@risd.edu",
        password: hashedPassword,
        college: "RISD, Providence",
        city: "Providence",
        bio: "Industrial Design senior at RISD. I specialize in mobile app interfaces, prototyping workflows, and visual design systems.",
        skillsToTeach: ["UI Design", "Figma Prototyping", "Design Systems"],
        skillsToLearn: ["Python", "Web Development"]
      },
      {
        name: "Jordan Smith",
        email: "jordan@utexas.edu",
        password: hashedPassword,
        college: "UT Austin",
        city: "Austin",
        bio: "Applied Mathematics senior at UT Austin. Former teaching assistant with 2+ years of tutoring college calculus, linear algebra, and statistics.",
        skillsToTeach: ["Calculus I & II", "Differential Equations", "Linear Algebra"],
        skillsToLearn: ["Acoustic Guitar", "Music Theory"]
      },
      {
        name: "Elena Rodriguez",
        email: "elena@berkeley.edu",
        password: hashedPassword,
        college: "UC Berkeley",
        city: "Berkeley",
        bio: "Native Spanish speaker and comparative literature major at Berkeley. I focus on immersive language techniques and colloquial dialogue practice.",
        skillsToTeach: ["Spanish Speaking", "Grammar drills", "Latin American Literature"],
        skillsToLearn: ["GMAT Quantitative", "Math"]
      },
      {
        name: "Liam O'Connor",
        email: "liam@nyu.edu",
        password: hashedPassword,
        college: "NYU, New York",
        city: "New York",
        bio: "Music production student at NYU Tisch. I have played acoustic and classical guitar for 8 years and love teaching beginner chord structures.",
        skillsToTeach: ["Acoustic Guitar", "Music Theory Basics", "Songwriting"],
        skillsToLearn: ["Coding", "Algorithms"]
      },
      {
        name: "Maya Patel",
        email: "maya@lse.ac.uk",
        password: hashedPassword,
        college: "LSE, London",
        city: "London",
        bio: "Finance graduate from London School of Economics. Scored 750 on GMAT (98th percentile). I coach students on quantitative reasoning speed-tricks.",
        skillsToTeach: ["GMAT Quantitative", "Analytical Writing", "Integrated Reasoning"],
        skillsToLearn: ["Spanish", "French"]
      }
    ];

    console.log("Seeding Users...");
    const createdUsers = await User.insertMany(usersData);
    console.log(`Seeded ${createdUsers.length} users successfully!`);

    // Map names to User IDs for skill referencing
    const userMap = {};
    createdUsers.forEach(user => {
      userMap[user.name] = user;
    });

    // Mock Skills Data
    const skillsData = [
      {
        userId: userMap["Alex Rivera"]._id,
        name: "Alex Rivera",
        school: "Stanford University",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        tutorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
        category: "Coding",
        categoryClass: "coding",
        title: "Python for Beginners",
        description: "Learn the fundamentals of Python including data types, loops, and basic automation scripts. Great for non-CS majors!",
        availability: "Available Weekends",
        rating: 4.9,
        reviews: 2,
        tutorBio: userMap["Alex Rivera"].bio,
        tutorTeaches: userMap["Alex Rivera"].skillsToTeach,
        reviewsList: [
          {
            initials: "JS",
            avatarClass: "blue-avatar",
            name: "Jordan Smith",
            date: "Oct 12, 2024",
            rating: 5,
            comment: "Alex is an incredible teacher. He broke down complex concepts like loops and conditionals into very simple analogies that made perfect sense."
          },
          {
            initials: "CL",
            avatarClass: "purple-avatar",
            name: "Claire Lee",
            date: "Sep 28, 2024",
            rating: 4,
            comment: "The hands-on coding was super helpful. Alex really knows his stuff and is very patient when you run into bugs."
          }
        ]
      },
      {
        userId: userMap["Sarah Chen"]._id,
        name: "Sarah Chen",
        school: "RISD, Providence",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
        tutorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
        category: "Design",
        categoryClass: "design",
        title: "UI Design Fundamentals",
        description: "Master Figma and the principles of typography, color theory, and layout for web and mobile interfaces.",
        availability: "Mon - Wed Evenings",
        rating: 4.8,
        reviews: 2,
        tutorBio: userMap["Sarah Chen"].bio,
        tutorTeaches: userMap["Sarah Chen"].skillsToTeach,
        reviewsList: [
          {
            initials: "ER",
            avatarClass: "blue-avatar",
            name: "Elena Rodriguez",
            date: "Oct 05, 2024",
            rating: 5,
            comment: "Sarah is a Figma wizard! She taught me auto-layout and components in just one session. Highly recommend her design lessons!"
          },
          {
            initials: "LO",
            avatarClass: "purple-avatar",
            name: "Liam O'Connor",
            date: "Sep 15, 2024",
            rating: 4,
            comment: "Very structured and clear. I finally understand the basics of grid layouts and color schemes. Thanks, Sarah!"
          }
        ]
      },
      {
        userId: userMap["Jordan Smith"]._id,
        name: "Jordan Smith",
        school: "UT Austin",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        tutorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
        category: "Math",
        categoryClass: "math",
        title: "Advanced Calculus Prep",
        description: "Preparing for midterms? I'll help you crack integration, limits, and multi-variable equations with ease.",
        availability: "Flexible Schedule",
        rating: 5.0,
        reviews: 2,
        tutorBio: userMap["Jordan Smith"].bio,
        tutorTeaches: userMap["Jordan Smith"].skillsToTeach,
        reviewsList: [
          {
            initials: "AR",
            avatarClass: "blue-avatar",
            name: "Alex Rivera",
            date: "Oct 20, 2024",
            rating: 5,
            comment: "Jordan is a lifesaver. I was struggling with triple integrals and he explained it in 15 minutes. Absolutely flawless math tutor."
          },
          {
            initials: "MP",
            avatarClass: "purple-avatar",
            name: "Maya Patel",
            date: "Sep 30, 2024",
            rating: 5,
            comment: "Excellent prep work. He provided custom practice problems that prepared me perfectly for my calculus midterm. A++!"
          }
        ]
      },
      {
        userId: userMap["Elena Rodriguez"]._id,
        name: "Elena Rodriguez",
        school: "UC Berkeley",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        tutorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
        category: "Languages",
        categoryClass: "languages",
        title: "Conversational Spanish",
        description: "Practice real-world Spanish conversations. Focus on fluency, slang, and cultural nuances in a relaxed environment.",
        availability: "Weekday Mornings",
        rating: 4.7,
        reviews: 2,
        tutorBio: userMap["Elena Rodriguez"].bio,
        tutorTeaches: userMap["Elena Rodriguez"].skillsToTeach,
        reviewsList: [
          {
            initials: "SC",
            avatarClass: "blue-avatar",
            name: "Sarah Chen",
            date: "Oct 14, 2024",
            rating: 5,
            comment: "Elena is super friendly and patient. Speaking Spanish is always intimidating but she makes the sessions feel like a casual coffee chat."
          },
          {
            initials: "JS",
            avatarClass: "purple-avatar",
            name: "Jordan Smith",
            date: "Sep 22, 2024",
            rating: 4,
            comment: "Perfect for conversational practice. She corrects pronunciation errors very gently and introduces useful slang."
          }
        ]
      },
      {
        userId: userMap["Liam O'Connor"]._id,
        name: "Liam O'Connor",
        school: "NYU, New York",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
        tutorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
        category: "Music",
        categoryClass: "music",
        title: "Acoustic Guitar 101",
        description: "Learn your first chords and basic strumming patterns. Perfect for absolute beginners who just bought their first guitar.",
        availability: "Weekends Only",
        rating: 4.9,
        reviews: 2,
        tutorBio: userMap["Liam O'Connor"].bio,
        tutorTeaches: userMap["Liam O'Connor"].skillsToTeach,
        reviewsList: [
          {
            initials: "MP",
            avatarClass: "blue-avatar",
            name: "Maya Patel",
            date: "Oct 08, 2024",
            rating: 5,
            comment: "Liam makes learning guitar so much fun. I could play my first three-chord song by the end of our first lesson! Highly recommend."
          },
          {
            initials: "AR",
            avatarClass: "purple-avatar",
            name: "Alex Rivera",
            date: "Sep 18, 2024",
            rating: 5,
            comment: "Great instructor! He is very detail-oriented about finger positioning, which prevented me from building bad habits early on."
          }
        ]
      },
      {
        userId: userMap["Maya Patel"]._id,
        name: "Maya Patel",
        school: "LSE, London",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
        tutorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
        category: "Exam Prep",
        categoryClass: "examprep",
        title: "GMAT Strategy & Tips",
        description: "I scored 740+ on my first attempt. Let me show you the shortcuts and logical reasoning patterns that really work.",
        availability: "Tuesday / Thursday",
        rating: 4.9,
        reviews: 2,
        tutorBio: userMap["Maya Patel"].bio,
        tutorTeaches: userMap["Maya Patel"].skillsToTeach,
        reviewsList: [
          {
            initials: "CL",
            avatarClass: "blue-avatar",
            name: "Claire Lee",
            date: "Oct 11, 2024",
            rating: 5,
            comment: "Maya's shortcuts for the quantitative section are absolute lifesavers. My practice test score jumped by 50 points after just 3 sessions."
          },
          {
            initials: "ER",
            avatarClass: "purple-avatar",
            name: "Elena Rodriguez",
            date: "Sep 25, 2024",
            rating: 5,
            comment: "Extremely structured approach. She doesn't just teach math concepts; she teaches how to analyze the exam patterns. Brilliant coach."
          }
        ]
      }
    ];

    console.log("Seeding Skills...");
    const createdSkills = await Skill.insertMany(skillsData);
    console.log(`Seeded ${createdSkills.length} skills successfully!`);

    // Mock Bookings Data
    const bookingsData = [
      {
        skillId: createdSkills[2]._id, // Advanced Calculus Prep (Jordan Smith)
        tutorId: userMap["Jordan Smith"]._id,
        studentId: userMap["Alex Rivera"]._id,
        subject: "Advanced Calculus",
        date: "2026-07-15",
        time: "Afternoon (12:00 PM - 4:00 PM)",
        message: "Need help with double integrations.",
        status: "Confirmed"
      },
      {
        skillId: createdSkills[0]._id, // Python for Beginners (Alex Rivera)
        tutorId: userMap["Alex Rivera"]._id,
        studentId: userMap["Sarah Chen"]._id,
        subject: "Python for Beginners",
        date: "2026-07-20",
        time: "Morning (8:00 AM - 12:00 PM)",
        message: "Hi Alex! Absolute beginner here, looking forward to starting with Python variables.",
        status: "Pending"
      }
    ];

    console.log("Seeding Bookings...");
    const createdBookings = await Booking.insertMany(bookingsData);
    console.log(`Seeded ${createdBookings.length} bookings successfully!`);

    console.log("Data Seeding Completed Successfully! 🌟");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Failed ❌", error);
    process.exit(1);
  }
};

seedData();
