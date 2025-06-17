import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

// HERE WE ARE VALIDATING THE ISSUE DATa with the zos livrary
//we only validate the 2 properties others are by default so

const validateIssue = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]), 
});                             

// we are exporting a function that will handle the POST request here we are using
// NextRequest and NextResponse from next/server to handle the request and response
export async function POST(request: NextRequest)
 {
  const body = await request.json();
  const Validation = validateIssue.safeParse(body);

  if (!Validation.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  } else {
    const newIssue = await prisma.issues.create({
        data:{
            title:Validation.data.title,
            description: Validation.data.description,
            status: Validation.data.status,
        }
    })
    return NextResponse.json({ message: "Issue created successfully", data: newIssue }, {
        status: 201,
    })
  }
}
