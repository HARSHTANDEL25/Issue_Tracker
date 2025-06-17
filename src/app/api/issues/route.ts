import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { validateIssue } from "../../validateIssue";

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
