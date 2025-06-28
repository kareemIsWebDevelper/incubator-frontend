import { DocumentationType } from "@/types/DocumentationTypes";

export const db: Array<DocumentationType> = [
  {
    id: "1",
    title: "Documentation 1",
    content: "<div><h2>Mentor Guidelines</h2><p>This documentation provides comprehensive guidelines for mentors in our incubator program.</p><ul><li>Regular check-ins with startups</li><li>Provide strategic guidance</li><li>Connect with industry experts</li></ul></div>",
    arrange: "2",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
    showContentFor: "mentors",
  },
  {
    id: "2",
    title: "Documentation 2",
    content: "<div><h2>Judging Criteria</h2><p>This document outlines the evaluation criteria for startup assessments.</p><ol><li><strong>Innovation:</strong> Uniqueness of the solution</li><li><strong>Market Potential:</strong> Size and accessibility of target market</li><li><strong>Team:</strong> Expertise and commitment of founding team</li><li><strong>Execution:</strong> Progress and milestones achieved</li></ol><blockquote>Remember to maintain objectivity throughout the evaluation process.</blockquote></div>",
    arrange: "3",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
    showContentFor: "judgers",
  },
  {
    id: "3",
    title: "Documentation 3",
    content: "<div><h2>User Manual</h2><p>Welcome to the incubator platform! This guide will help you navigate through the system.</p><h3>Getting Started</h3><p>Follow these steps to begin:</p><ol><li>Complete your profile setup</li><li>Browse available programs</li><li>Submit your application</li></ol><p><em>For technical support, contact our help desk.</em></p></div>",
    arrange: "4",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
    showContentFor: "users",
  },
  {
    id: "3",
    title: "Documentation 3",
    content: "<div><h2>Management Dashboard</h2><p>This documentation covers the management interface and administrative functions.</p><h3>Key Features</h3><ul><li><strong>Program Overview:</strong> Monitor all active programs</li><li><strong>User Management:</strong> Handle user roles and permissions</li><li><strong>Reporting:</strong> Generate comprehensive reports</li><li><strong>Settings:</strong> Configure system parameters</li></ul><div class='alert alert-info'><p>Access to management features requires appropriate permissions.</p></div></div>",
    arrange: "4",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
    showContentFor: "managers",
  },
  {
    id: "4",
    title: "Documentation 4",
    content: "<div><h2>General Information</h2><p>This documentation contains general information about our incubator program that applies to all users.</p><h3>Mission Statement</h3><p>Our mission is to <strong>accelerate innovation</strong> by providing comprehensive support to early-stage startups.</p><h3>Core Values</h3><ul><li>Innovation and creativity</li><li>Collaboration and community</li><li>Integrity and transparency</li><li>Continuous learning</li></ul><hr><p><small>Last updated: June 2025</small></p></div>",
    arrange: "4",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
    showContentFor: "all",
  },
];
