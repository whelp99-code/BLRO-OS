import { NextResponse } from "next/server"; import { mailItems } from "@/server/mock-data"; export async function GET(){return NextResponse.json({ok:true,data:mailItems,error:null})}
