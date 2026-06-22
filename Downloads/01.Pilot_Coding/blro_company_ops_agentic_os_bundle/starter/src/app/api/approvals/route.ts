import { NextResponse } from "next/server"; import { approvals } from "@/server/mock-data"; export async function GET(){return NextResponse.json({ok:true,data:approvals,error:null})}
