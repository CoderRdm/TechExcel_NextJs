// File: /app/api/templates/createtemplate/route.js
import { NextResponse } from 'next/server';
import { db } from '@/db/dbclient';
import { templates, header, experience, education, skillrelations, skill } from '@/db/schema';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request) {
  try {
    // Get session for authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized - Please log in" }, { status: 401 });
    }
    
    const userid = session.user.id;
    const requestData = await request.json();
    const { about, header: headerData, experiences, educations, skills } = requestData;

    // Insert template
    const [template] = await db.insert(templates).values({ about, userid }).returning();

    // Insert header data
    if (headerData) {
      await db.insert(header).values({ ...headerData, templateid: template.id }).returning();
    }

    // Insert experiences
    if (experiences && experiences.length > 0) {
      await db.insert(experience).values(
        experiences.map(exp => ({ ...exp, templateid: template.id }))
      ).returning();
    }

    // Insert educations
    if (educations && educations.length > 0) {
      await db.insert(education).values(
        educations.map(edu => ({ ...edu, templateid: template.id }))
      ).returning();
    }

    // Insert skills
    if (skills && skills.length > 0) {
      const skillEntries = await db.insert(skill).values(
        skills.map(skl => ({ name: skl.name }))
      ).returning();

      await db.insert(skillrelations).values(
        skillEntries.map(skl => ({ skillid: skl.id, templateid: template.id }))
      );
    }

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
  }
}