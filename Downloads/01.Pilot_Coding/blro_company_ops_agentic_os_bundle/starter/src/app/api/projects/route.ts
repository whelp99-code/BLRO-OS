import { NextResponse } from "next/server"; import { projects } from "@/server/mock-data"; export async function GET(){return NextResponse.json({ok:true,data:projects,error:null})}
