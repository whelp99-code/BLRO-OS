import { NextResponse } from "next/server"; import { personas } from "@/server/mock-data"; export async function GET(){return NextResponse.json({ok:true,data:personas,error:null})}
